import { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import { noticiaService } from "../services/noticiaService";
import { Noticia } from "../models/noticia";

const NoticiaService = new noticiaService();

export async function noticiaRouter(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const method = req.method ?? "";

    try {
        if (method === "GET" && url === "/noticias") {
            const noticias = await NoticiaService.obtenerNoticias();

            res.writeHead(200);
            res.end(JSON.stringify(noticias));

            return;
        }


        if (method === "POST" && url === "/noticias") {
            try {
                const noticia = await json(req) as Noticia;
                const nueva = await NoticiaService.crearNoticia(noticia);

                res.writeHead(201);
                res.end(JSON.stringify({ mensaje: "Noticia agregada", data: nueva }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "GET" && url.startsWith("/noticias/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                const noticia = await NoticiaService.obtenerNoticiaPorId(id);

                res.writeHead(200);
                res.end(JSON.stringify(noticia));

            } catch (error) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "PUT" && url.startsWith("/noticias/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                const noticia = await json(req) as Noticia;

                noticia.idNoticia = id; 
                await NoticiaService.actualizarNoticia(noticia);

                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Noticia actualizada" }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }
        

        if (method === "DELETE" && url.startsWith("/noticias/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                await NoticiaService.eliminarNoticia(id);

                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Noticia eliminada" }));

            } catch (error) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }

        res.writeHead(404);
        res.end(JSON.stringify({ mensaje: "Ruta no encontrada" }));

    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ mensaje: "Error interno del servidor" }));
    }
}
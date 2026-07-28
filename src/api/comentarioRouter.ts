import { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import { comentarioService } from "../services/comentarioService";
import { Comentario } from "../models/comentario";

const ComentarioService = new comentarioService();

export async function comentarioRouter(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const method = req.method ?? "";

    try {
        if (method === "GET" && url === "/comentarios") {
            const comentarios = await ComentarioService.obtenerComentarios();

            res.writeHead(200);
            res.end(JSON.stringify(comentarios));

            return;
        }


        if (method === "POST" && url === "/comentarios") {
            try {
                const comentario = await json(req) as Comentario;
                const nuevo = await ComentarioService.crearComentario(comentario);

                res.writeHead(201);
                res.end(JSON.stringify({ mensaje: "Comentario agregado", data: nuevo }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "GET" && url.startsWith("/comentarios/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                const comentario = await ComentarioService.obtenerComentarioPorId(id);

                res.writeHead(200);
                res.end(JSON.stringify(comentario));

            } catch (error) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "PUT" && url.startsWith("/comentarios/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                const comentario = await json(req) as Comentario;

                comentario.idComentario = id;
                await ComentarioService.actualizarComentario(comentario);

                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Comentario actualizado" }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "DELETE" && url.startsWith("/comentarios/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                await ComentarioService.eliminarComentario(id);

                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Comentario eliminado" }));
                
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
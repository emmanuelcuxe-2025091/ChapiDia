import { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import { likeService } from "../services/likeService";
import { Like } from "../models/like";

const LikeService = new likeService();

export async function likeRouter(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const method = req.method ?? "";

    try {
        if (method === "GET" && url === "/likes") {
            const likes = await LikeService.obtenerLikes();

            res.writeHead(200);
            res.end(JSON.stringify(likes));

            return;
        }


        if (method === "POST" && url === "/likes") {
            try {
                const like = await json(req) as Like;
                const nuevo = await LikeService.crearLike(like);

                res.writeHead(201);
                res.end(JSON.stringify({ mensaje: "Like agregado", data: nuevo }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "GET" && url.startsWith("/likes/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                const like = await LikeService.obtenerLikePorId(id);

                res.writeHead(200);
                res.end(JSON.stringify(like));

            } catch (error) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "PUT" && url.startsWith("/likes/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                const like = await json(req) as Like;

                like.idLike = id;
                await LikeService.actualizarLike(like);

                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Like actualizado" }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "DELETE" && url.startsWith("/likes/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                await LikeService.eliminarLike(id);

                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Like eliminado" }));
                
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
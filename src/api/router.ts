import { IncomingMessage, ServerResponse } from "http";
import { usuarioRouter } from "./usuarioRouter";
import { noticiaRouter } from "./noticiaRouter";
import { categoriaRouter } from "./categoriaRouter";
import { comentarioRouter } from "./comentarioRouter";
import { likeRouter } from "./likeRouter";

export async function mainRouter (req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";

    if (url.startsWith("/usuarios")) {
        await usuarioRouter(req, res);

    } else if (url.startsWith("/noticias")) {
        await noticiaRouter(req, res);

    } else if (url.startsWith("/categorias")) {
        await categoriaRouter(req, res);

    } else if (url.startsWith("/comentarios")) {
        await comentarioRouter(req, res);

    } else if (url.startsWith("/likes")) {
        await likeRouter(req, res);

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ mensaje: "Ruta no encontrada" }));
    }
}
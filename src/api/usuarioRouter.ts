import { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import { usuarioService } from "../services/usuarioService";
import { Usuario } from "../models/usuario";

const UsuarioService = new usuarioService();

export async function usuarioRouter (req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const method = req.method ?? "";

    try {
        if (method === "GET" && url === "/usuarios") {
            const usuarios = await UsuarioService.obtenerUsuarios();

            res.writeHead(200);
            res.end(JSON.stringify(usuarios));

            return;
        }


        if (method === "POST" && url === "/usuarios") {
            try {
                const usuario = await json(req) as Usuario;
                const nuevo = await UsuarioService.crearUsuario(usuario);

                res.writeHead(201);
                res.end(JSON.stringify({ mensaje: "Usuario agregado", data: nuevo }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "GET" && url.startsWith("/usuarios/")) {
            const id = parseInt(url.split("/").pop() ?? "");
            try {
                const usuario = await UsuarioService.obtenerUsuarioPorId(id);

                res.writeHead(200);
                res.end(JSON.stringify(usuario));

            } catch (error) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "PUT" && url.startsWith("/usuarios/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                const usuario = await json(req) as Usuario;

                usuario.idUsuario = id;
                await UsuarioService.actualizarUsuario(usuario);

                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Usuario actualizado" }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "DELETE" && url.startsWith("/usuarios/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                await UsuarioService.eliminarUsuario(id);

                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Usuario eliminado" }));

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
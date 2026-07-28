import { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import { categoriaService } from "../services/categoriaService";
import { Categoria } from "../models/categoria";

const CategoriaService = new categoriaService();

export async function categoriaRouter(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");

    const url = req.url ?? "";
    const method = req.method ?? "";

    try {
        if (method === "GET" && url === "/categorias") {
            const categorias = await CategoriaService.obtenerCategorias();

            res.writeHead(200);
            res.end(JSON.stringify(categorias));

            return;
        }


        if (method === "POST" && url === "/categorias") {
            try {
                const categoria = await json(req) as Categoria;
                const nueva = await CategoriaService.crearCategoria(categoria);

                res.writeHead(201);
                res.end(JSON.stringify({ mensaje: "Categoría agregada", data: nueva }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "GET" && url.startsWith("/categorias/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                const categoria = await CategoriaService.obtenerCategoriaPorId(id);

                res.writeHead(200);
                res.end(JSON.stringify(categoria));

            } catch (error) {
                res.writeHead(404);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "PUT" && url.startsWith("/categorias/")) {
            const id = parseInt(url.split("/").pop() ?? "");

            try {
                const categoria = await json(req) as Categoria;

                categoria.idCategoria = id;
                await CategoriaService.actualizarCategoria(categoria);

                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Categoría actualizada" }));

            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
            return;
        }


        if (method === "DELETE" && url.startsWith("/categorias/")) {
            const id = parseInt(url.split("/").pop() ?? "");
            
            try {
                await CategoriaService.eliminarCategoria(id);

                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Categoría eliminada" }));

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
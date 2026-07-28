import { comentarioCliente } from "../client/comentarioCliente";
import { rl } from "../utils/readline";

const ComentarioCliente = new comentarioCliente();

export async function comentariosMenu() {
    console.log("\n--- CRUD DE COMENTARIOS ---");
    console.log("1. Listar | 2. Buscar | 3. Agregar | 4. Actualizar | 5. Eliminar");
    
    const op = await rl.question("Opción: ");

    try {
        if (op === "1") {

            const comentarios = await ComentarioCliente.obtenerComentarios();
            console.table(comentarios);

        } else if (op === "2") {

            const id = Number(await rl.question("ID: "));
            const comentario = await ComentarioCliente.obtenerComentarioPorId(id);

            console.log(comentario);

        } else if (op === "3") {
            
            const idComentario = Number(await rl.question("ID: "));
            const idUsuario = Number(await rl.question("ID Usuario: "));
            const idNoticia = Number(await rl.question("ID Noticia: "));
            const texto = await rl.question("Contenido del comentario: ");
            const fecha = new Date();
            
            await ComentarioCliente.crearComentario({ idComentario, idUsuario, idNoticia, texto, fecha } as any);
            console.log("Comentario agregado correctamente.");

        } else if (op === "4") {

            const idComentario = Number(await rl.question("ID del comentario a actualizar: "));
            const texto = await rl.question("Nuevo contenido: ");
            
            await ComentarioCliente.actualizarComentario(idComentario, { texto } as any);
            console.log("Comentario actualizado correctamente.");

        } else if (op === "5") {

            const id = Number(await rl.question("ID del comentario a eliminar: "));

            await ComentarioCliente.eliminarComentario(id);
            console.log("Comentario eliminado correctamente.");

        }
    } catch (error) {
        console.error("Error en la operación:", (error as Error).message);
    }

    await rl.question("\nEnter para volver...");
}
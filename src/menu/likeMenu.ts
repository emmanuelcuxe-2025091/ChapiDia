import { likeCliente } from "../client/likeCliente";
import { rl } from "../utils/readline";

const LikeCliente = new likeCliente();

export async function likesMenu() {
    console.log("\n--- CRUD DE LIKES ---");
    console.log("1. Listar | 2. Buscar | 3. Agregar | 4. Actualizar | 5. Eliminar");
    
    const op = await rl.question("Opción: ");

    try {
        if (op === "1") {

            const likes = await LikeCliente.obtenerLikes();
            console.table(likes);

        } else if (op === "2") {

            const id = Number(await rl.question("ID: "));
            const like = await LikeCliente.obtenerLikePorId(id);
            
            console.log(like);

        } else if (op === "3") {

            const idLike = Number(await rl.question("ID: "));
            const idUsuario = Number(await rl.question("ID Usuario: "));
            const tipo = await rl.question("Tipo (Noticia/Comentario): ");
            const idTipo = Number(await rl.question("ID de la Noticia o Comentario: "));
            
            await LikeCliente.crearLike({ idLike, idUsuario, tipo, idTipo } as any);
            console.log("Like agregado correctamente.");

        } else if (op === "4") {

            const idLike = Number(await rl.question("ID del like a actualizar: "));
            const tipo = await rl.question("Nuevo Tipo (Noticia/Comentario): ");
            const idTipo = Number(await rl.question("Nuevo ID de Noticia/Comentario: "));
            
            await LikeCliente.actualizarLike(idLike, { tipo, idTipo } as any);
            console.log("Like actualizado correctamente.");

        } else if (op === "5") {

            const id = Number(await rl.question("ID del like a eliminar: "));

            await LikeCliente.eliminarLike(id);
            console.log("Like eliminado correctamente.");

        }
    } catch (error) {
        console.error("Error en la operación:", (error as Error).message);
    }

    await rl.question("\nEnter para volver...");
}
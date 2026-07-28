import { noticiaCliente } from "../client/noticiaCliente";
import { rl } from "../utils/readline";

const NoticiaCliente = new noticiaCliente();

export async function noticiasMenu() {
    console.log("\n--- CRUD DE NOTICIAS ---");
    console.log("1. Listar | 2. Buscar | 3. Agregar | 4. Actualizar | 5. Eliminar");
    
    const op = await rl.question("Opción: ");

    try {
        if (op === "1") {

            const noticias = await NoticiaCliente.obtenerNoticias();
            console.table(noticias);

        } else if (op === "2") {

            const id = Number(await rl.question("ID: "));
            const noticia = await NoticiaCliente.obtenerNoticiaPorId(id);

            console.log(noticia);

        } else if (op === "3") {

            const idNoticia = Number(await rl.question("ID: "));
            const titulo = await rl.question("Título: ");
            const contenido = await rl.question("Contenido: ");
            const fechaNoticia = new Date();
            const estado = await rl.question("Estado (Publicado/Archivado): ");
            const idUsuario = Number(await rl.question("ID Usuario (autor): "));
            const idCategoria = Number(await rl.question("ID Categoría: "));
            const imagenNoticia = await rl.question("URL Imagen (opcional, Enter para omitir): ");
            
            await NoticiaCliente.crearNoticia({ 
                idNoticia, titulo, contenido, fechaNoticia, estado, idUsuario, idCategoria,
                ...(imagenNoticia ? { imagenNoticia } : {})
            } as any);
            console.log("Noticia agregada correctamente.");

        } else if (op === "4") {

            const idNoticia = Number(await rl.question("ID de la noticia a actualizar: "));
            const titulo = await rl.question("Nuevo Título: ");
            const contenido = await rl.question("Nuevo Contenido: ");
            const estado = await rl.question("Nuevo Estado (Publicado/Archivado): ");
            
            await NoticiaCliente.actualizarNoticia(idNoticia, { titulo, contenido, estado } as any);
            console.log("Noticia actualizada correctamente.");

        } else if (op === "5") {

            const id = Number(await rl.question("ID de la noticia a eliminar: "));

            await NoticiaCliente.eliminarNoticia(id);
            console.log("Noticia eliminada correctamente.");
            
        }
    } catch (error) {
        console.error("Error en la operación:", (error as Error).message);
    }

    await rl.question("\nEnter para volver...");
}

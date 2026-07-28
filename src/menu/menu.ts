import { rl } from "../utils/readline";
import { usuarioCliente } from "../client/usuarioCliente";
import { noticiaCliente } from "../client/noticiaCliente";
import { categoriaCliente } from "../client/categoriaCliente";
import { comentarioCliente } from "../client/comentarioCliente";
import { likeCliente } from "../client/likeCliente";

const UsuarioCliente = new usuarioCliente();
const NoticiaCliente = new noticiaCliente();
const CategoriaCliente = new categoriaCliente();
const ComentarioCliente = new comentarioCliente();
const LikeCliente = new likeCliente();

async function menuUsuarios() {
    console.log("\n--- CRUD DE USUARIOS ---");
    console.log("1. Listar | 2. Buscar | 3. Agregar | 4. Actualizar | 5. Eliminar");
    
    const op = await rl.question("Opción: ");

    try {
        if (op === "1") {
            const usuarios = await UsuarioCliente.obtenerUsuarios();
            console.table(usuarios);

        } else if (op === "2") {
            const id = Number(await rl.question("ID: "));
            const usuario = await UsuarioCliente.obtenerUsuarioPorId(id);
            console.log(usuario);

        } else if (op === "3") {
            const id = Number(await rl.question("ID: "));
            const nombre = await rl.question("Nombre: ");
            const edad = Number(await rl.question("Edad: "));
            const rol = await rl.question("Rol (ADMIN/USER): ");
            const estado = await rl.question("Estado (ACTIVO/INACTIVO): ");
            
            await UsuarioCliente.crearUsuario({ id, nombre, edad, rol, estado } as any);
            console.log("Usuario agregado correctamente.");

        } else if (op === "4") {
            const id = Number(await rl.question("ID del usuario a actualizar: "));
            const nombre = await rl.question("Nuevo Nombre: ");
            const edad = Number(await rl.question("Nueva Edad: "));
            const rol = await rl.question("Nuevo Rol: ");
            const estado = await rl.question("Nuevo Estado: ");
            
            await UsuarioCliente.actualizarUsuario(id, { nombre, edad, rol, estado } as any);
            console.log("Usuario actualizado correctamente.");

        } else if (op === "5") {
            const id = Number(await rl.question("ID del usuario a eliminar: "));
            await UsuarioCliente.eliminarUsuario(id);
            console.log("Usuario eliminado correctamente.");
        }

    } catch (error) {
        console.error("Error en la operación:", (error as Error).message);
    }

    await rl.question("\nEnter para volver...");
}


async function menuNoticias() {
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
            const id = Number(await rl.question("ID: "));
            const titulo = await rl.question("Título: ");
            const contenido = await rl.question("Contenido: ");
            
            await NoticiaCliente.crearNoticia({ id, titulo, contenido } as any);
            console.log("Noticia agregada correctamente.");

        } else if (op === "4") {
            const id = Number(await rl.question("ID de la noticia a actualizar: "));
            const titulo = await rl.question("Nuevo Título: ");
            const contenido = await rl.question("Nuevo Contenido: ");
            
            await NoticiaCliente.actualizarNoticia(id, { titulo, contenido } as any);
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


async function menuCategorias() {
    console.log("\n--- CRUD DE CATEGORÍAS ---");
    console.log("1. Listar | 2. Buscar | 3. Agregar | 4. Actualizar | 5. Eliminar");
    
    const op = await rl.question("Opción: ");

    try {
        if (op === "1") {
            const categorias = await CategoriaCliente.obtenerCategorias();
            console.table(categorias);

        } else if (op === "2") {
            const id = Number(await rl.question("ID: "));
            const categoria = await CategoriaCliente.obtenerCategoriaPorId(id);
            console.log(categoria);

        } else if (op === "3") {
            const id = Number(await rl.question("ID: "));
            const nombre = await rl.question("Nombre de la categoría: ");
            
            await CategoriaCliente.crearCategoria({ id, nombre } as any);
            console.log("Categoría agregada correctamente.");

        } else if (op === "4") {
            const id = Number(await rl.question("ID de la categoría a actualizar: "));
            const nombre = await rl.question("Nuevo Nombre: ");
            
            await CategoriaCliente.actualizarCategoria(id, { nombre } as any);
            console.log("Categoría actualizada correctamente.");

        } else if (op === "5") {
            const id = Number(await rl.question("ID de la categoría a eliminar: "));
            await CategoriaCliente.eliminarCategoria(id);
            console.log("Categoría eliminada correctamente.");
        }

    } catch (error) {
        console.error("Error en la operación:", (error as Error).message);
    }

    await rl.question("\nEnter para volver...");
}


async function menuComentarios() {
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
            const id = Number(await rl.question("ID: "));
            const idUsuario = Number(await rl.question("ID Usuario: "));
            const idNoticia = Number(await rl.question("ID Noticia: "));
            const contenido = await rl.question("Contenido del comentario: ");
            
            await ComentarioCliente.crearComentario({ id, idUsuario, idNoticia, contenido } as any);
            console.log("Comentario agregado correctamente.");

        } else if (op === "4") {
            const id = Number(await rl.question("ID del comentario a actualizar: "));
            const contenido = await rl.question("Nuevo contenido: ");
            
            await ComentarioCliente.actualizarComentario(id, { contenido } as any);
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


async function menuLikes() {
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
            const id = Number(await rl.question("ID: "));
            const idUsuario = Number(await rl.question("ID Usuario: "));
            const idNoticia = Number(await rl.question("ID Noticia: "));
            
            await LikeCliente.crearLike({ id, idUsuario, idNoticia } as any);
            console.log("Like agregado correctamente.");

        } else if (op === "4") {
            const id = Number(await rl.question("ID del like a actualizar: "));
            const idUsuario = Number(await rl.question("Nuevo ID Usuario: "));
            const idNoticia = Number(await rl.question("Nuevo ID Noticia: "));
            
            await LikeCliente.actualizarLike(id, { idUsuario, idNoticia } as any);
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


export async function menu() {
    let opcion = "";

    do {
        console.clear();
        console.log("================================");
        console.log(" MENÚ PRINCIPAL - SISTEMA API");
        console.log("================================");
        console.log("1. Gestionar Usuarios");
        console.log("2. Gestionar Noticias");
        console.log("3. Gestionar Categorías");
        console.log("4. Gestionar Comentarios");
        console.log("5. Gestionar Likes");
        console.log("0. Salir");
        console.log("================================");

        opcion = await rl.question("Seleccione una opción: ");

        switch (opcion) {
            case "1": 
                await menuUsuarios(); 
                break;
            case "2": 
                await menuNoticias(); 
                break;
            case "3": 
                await menuCategorias(); 
                break;
            case "4": 
                await menuComentarios(); 
                break;
            case "5": 
                await menuLikes(); 
                break;
            case "0":
                rl.close();
                console.log("Hasta luego.");
                return;
            default:
                console.log("Opción incorrecta.");
                await rl.question("Presione ENTER para continuar...");
        }
    } while (true);
}
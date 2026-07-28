import { usuariosMenu } from "./usuarioMenu";
import { noticiasMenu } from "./noticiaMenu";
import { categoriasMenu } from "./categoriaMenu";
import { comentariosMenu } from "./comentarioMenu";
import { likesMenu } from "./likeMenu";
import { rl } from "../utils/readline";

export async function menu() {
    let opcion = "";

    do {
        console.clear();
        console.log("=============================");
        console.log("        MENÚ PRINCIPAL       ");
        console.log("=============================");
        console.log("1. Gestionar Usuarios");
        console.log("2. Gestionar Noticias");
        console.log("3. Gestionar Categorías");
        console.log("4. Gestionar Comentarios");
        console.log("5. Gestionar Likes");
        console.log("0. Salir");
        console.log("=============================");

        opcion = await rl.question("Seleccione una opción: ");

        switch (opcion) {
            case "1": 
                await usuariosMenu(); 
                break;
            case "2": 
                await noticiasMenu(); 
                break;
            case "3": 
                await categoriasMenu(); 
                break;
            case "4": 
                await comentariosMenu(); 
                break;
            case "5": 
                await likesMenu(); 
                break;
            case "0":
                rl.close();
                console.log("Hasta luego.");
                return;
            default:
                console.log("Opción incorrecta.");
                await rl.question("Enter para volver...");
        }
    } while (true);
}
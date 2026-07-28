import { usuarioCliente } from "../client/usuarioCliente";
import { rl } from "../utils/readline";

const UsuarioCliente = new usuarioCliente();

export async function usuariosMenu() {
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

            const idUsuario = Number(await rl.question("ID: "));
            const nombre = await rl.question("Nombre: ");
            const email = await rl.question("Email: ");
            const contrasena = await rl.question("Contraseña: ");
            const rol = await rl.question("Rol (Fotografo/Cliente/Admin): ");
            
            await UsuarioCliente.crearUsuario({ idUsuario, nombre, email, contrasena, rol } as any);
            console.log("Usuario agregado correctamente.");

        } else if (op === "4") {

            const idUsuario = Number(await rl.question("ID del usuario a actualizar: "));
            const nombre = await rl.question("Nuevo Nombre: ");
            const email = await rl.question("Nuevo Email: ");
            const contrasena = await rl.question("Nueva Contraseña: ");
            const rol = await rl.question("Nuevo Rol (Fotografo/Cliente/Admin): ");
            
            await UsuarioCliente.actualizarUsuario(idUsuario, { nombre, email, contrasena, rol } as any);
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
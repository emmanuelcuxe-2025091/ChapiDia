import { categoriaCliente } from "../client/categoriaCliente";
import { rl } from "../utils/readline";

const CategoriaCliente = new categoriaCliente();

export async function categoriasMenu() {
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

            const idCategoria = Number(await rl.question("ID: "));
            const nombreCategoria = await rl.question("Nombre de la categoría: ");
            const descripcion = await rl.question("Descripción: ");
            
            await CategoriaCliente.crearCategoria({ idCategoria, nombreCategoria, descripcion } as any);
            console.log("Categoría agregada correctamente.");

        } else if (op === "4") {

            const idCategoria = Number(await rl.question("ID de la categoría a actualizar: "));
            const nombreCategoria = await rl.question("Nuevo Nombre: ");
            const descripcion = await rl.question("Nueva Descripción: ");
            
            await CategoriaCliente.actualizarCategoria(idCategoria, { nombreCategoria, descripcion } as any);
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
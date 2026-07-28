import { Categoria } from "../models/categoria";

export class CategoriaClient {
    private URL = "http://localhost:3000/categorias";

    public async obtenerCategorias(): Promise<Categoria[]> {
        const respuesta = await fetch(this.URL);

        return await respuesta.json();
    }


    public async obtenerCategoriaPorId(id: number): Promise<Categoria> {
        const respuesta = await fetch(`${this.URL}/${id}`);

        if (!respuesta.ok) {
            throw new Error("Categoría no encontrada");
        }

        return await respuesta.json();
    }


    public async crearCategoria(categoria: Categoria): Promise<any> {
        const respuesta = await fetch(this.URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoria)
        });

        return await respuesta.json();
    }


    public async actualizarCategoria(id: number, categoria: Categoria): Promise<any> {
        const respuesta = await fetch(`${this.URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoria)
        });

        return await respuesta.json();
    }


    public async eliminarCategoria(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL}/${id}`, {
            method: "DELETE"
        });
        
        return await respuesta.json();
    }
}
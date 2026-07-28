import { Comentario } from "../models/comentario";

export class ComentarioClient {
    private URL = "http://localhost:3000/comentarios";

    public async obtenerComentarios(): Promise<Comentario[]> {
        const respuesta = await fetch(this.URL);

        return await respuesta.json();
    }


    public async obtenerComentarioPorId(id: number): Promise<Comentario> {
        const respuesta = await fetch(`${this.URL}/${id}`);
        
        if (!respuesta.ok) {
            throw new Error("Comentario no encontrado");
        }

        return await respuesta.json();
    }


    public async crearComentario(comentario: Comentario): Promise<any> {
        const respuesta = await fetch(this.URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comentario)
        });

        return await respuesta.json();
    }


    public async actualizarComentario(id: number, comentario: Comentario): Promise<any> {
        const respuesta = await fetch(`${this.URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comentario)
        });

        return await respuesta.json();
    }


    public async eliminarComentario(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL}/${id}`, {
            method: "DELETE"
        });

        return await respuesta.json();
    }
}
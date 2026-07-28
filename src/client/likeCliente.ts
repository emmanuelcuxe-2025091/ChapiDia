import { Like } from "../models/like";

export class likeCliente {
    private URL = "http://localhost:3000/likes";

    public async obtenerLikes(): Promise<Like[]> {
        const respuesta = await fetch(this.URL);

        return await respuesta.json();
    }


    public async obtenerLikePorId(id: number): Promise<Like> {
        const respuesta = await fetch(`${this.URL}/${id}`);

        if (!respuesta.ok) {
            throw new Error("Like no encontrado");
        }

        return await respuesta.json();
    }


    public async crearLike(like: Like): Promise<any> {
        const respuesta = await fetch(this.URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(like)
        });

        return await respuesta.json();
    }


    public async actualizarLike(id: number, like: Like): Promise<any> {
        const respuesta = await fetch(`${this.URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(like)
        });

        return await respuesta.json();
    }

    
    public async eliminarLike(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL}/${id}`, {
            method: "DELETE"
        });

        return await respuesta.json();
    }
}
import { Noticia } from "../models/noticia";

export class NoticiaClient {
    private URL = "http://localhost:3000/noticias";

    public async obtenerNoticias(): Promise<Noticia[]> {
        const respuesta = await fetch(this.URL);

        return await respuesta.json();
    }

    public async obtenerNoticiaPorId(id: number): Promise<Noticia> {
        const respuesta = await fetch(`${this.URL}/${id}`);

        if (!respuesta.ok) {
            throw new Error("Noticia no encontrada");
        }

        return await respuesta.json();
    }

    public async crearNoticia(noticia: Noticia): Promise<any> {
        const respuesta = await fetch(this.URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(noticia)
        });
        
        return await respuesta.json();
    }

    public async actualizarNoticia(id: number, noticia: Noticia): Promise<any> {
        const respuesta = await fetch(`${this.URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(noticia)
        });

        return await respuesta.json();
    }

    public async eliminarNoticia(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL}/${id}`, {
            method: "DELETE"
        });
        
        return await respuesta.json();
    }
}
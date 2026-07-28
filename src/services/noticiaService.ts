import { noticiaRepository } from '../data/noticiaRepository';
import { Noticia } from '../models/noticia';

export class noticiaService {
    private repository = new noticiaRepository();

    public async obtenerNoticias(): Promise<Noticia[]> {
        return await this.repository.findAll();
    }

    public async obtenerNoticiaPorId(id: number): Promise<Noticia> {
        const noticia = await this.repository.findById(id);

        if (!noticia) {
            throw new Error(`Noticia con ID ${id} no encontrada.`);
        }

        return noticia;
    }


    public async crearNoticia(data: Noticia): Promise<Noticia> {
        const estados = ["Publicado", "Archivado"];
        
        if (!data.titulo || !data.contenido || !data.estado) {
            throw new Error("Título, contenido y estado son obligatorios.");
        }

        if (data.titulo.length < 5) {
            throw new Error("El título es muy corto.");
        }

        if (!estados.includes(data.estado)) {
            throw new Error("Estado inválido.");
        }

        if (!data.imagenNoticia) {
            data.imagenNoticia = "https://default.jpg";
        }

        await this.repository.create(data);
        return data;
    }

    
    public async actualizarNoticia(noticiaActualizada: Noticia): Promise<void> {
        
        const existe = await this.repository.findById(noticiaActualizada.idNoticia);
        const estados = ["Publicado", "Archivado"];

        if (!existe) {
            throw new Error("No se puede actualizar: la noticia no existe.");
        }

        if (noticiaActualizada.estado && !estados.includes(noticiaActualizada.estado)) {
            throw new Error("Estado inválido.");
        }

        await this.repository.update(noticiaActualizada.idNoticia, noticiaActualizada);
    }


    public async eliminarNoticia(id: number): Promise<void> {
        const eliminado = await this.repository.delete(id);

        if (!eliminado) {
            throw new Error("No se pudo eliminar la noticia porque no existe.");
        }
    }
}
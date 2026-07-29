import { noticiaRepository } from '../data/noticiaRepository';
import { usuarioRepository } from '../data/usuarioRepository';
import { categoriaRepository } from '../data/categoriaRepository';
import { Noticia } from '../models/noticia';

export class noticiaService {
    private repository = new noticiaRepository();
    private usuarioRepo = new usuarioRepository();
    private categoriaRepo = new categoriaRepository();

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
        const noticias = await this.repository.findAll();

        if (!data.titulo || !data.contenido || !data.estado) {
            throw new Error("Título, contenido y estado son obligatorios.");
        }

        if (data.titulo.length < 5) {
            throw new Error("El título es muy corto.");
        }

        if (!estados.includes(data.estado)) {
            throw new Error("Estado inválido.");
        }

        if (noticias.find(n => n.idNoticia === data.idNoticia)) {
            throw new Error("Ya existe una noticia con ese ID.");
        }

        if (!data.idUsuario) {
            throw new Error("El idUsuario es obligatorio.");
        }
        const usuarioExiste = await this.usuarioRepo.findById(data.idUsuario);
        if (!usuarioExiste) {
            throw new Error("El usuario indicado no existe.");
        }

        if (!data.idCategoria) {
            throw new Error("El idCategoria es obligatorio.");
        }
        const categoriaExiste = await this.categoriaRepo.findById(data.idCategoria);
        if (!categoriaExiste) {
            throw new Error("La categoría indicada no existe.");
        }

        if (!data.fechaNoticia) {
            data.fechaNoticia = new Date();
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

        if (noticiaActualizada.titulo !== undefined) {
            if (noticiaActualizada.titulo.trim() === "") {
                throw new Error("El título no puede estar vacío.");
            }
            if (noticiaActualizada.titulo.length < 5) {
                throw new Error("El título es muy corto.");
            }
        }

        if (noticiaActualizada.contenido !== undefined && noticiaActualizada.contenido.trim() === "") {
            throw new Error("El contenido no puede estar vacío.");
        }

        if (noticiaActualizada.estado !== undefined) {
            if (noticiaActualizada.estado.trim() === "" || !estados.includes(noticiaActualizada.estado)) {
                throw new Error("Estado inválido.");
            }
        }

        if (noticiaActualizada.idUsuario !== undefined) {
            const usuarioExiste = await this.usuarioRepo.findById(noticiaActualizada.idUsuario);
            if (!usuarioExiste) {
                throw new Error("El usuario indicado no existe.");
            }
        }

        if (noticiaActualizada.idCategoria !== undefined) {
            const categoriaExiste = await this.categoriaRepo.findById(noticiaActualizada.idCategoria);
            if (!categoriaExiste) {
                throw new Error("La categoría indicada no existe.");
            }
        }

        await this.repository.update(noticiaActualizada.idNoticia, noticiaActualizada);
    }


    public async eliminarNoticia(id: number): Promise<void> {
        const eliminado = await this.repository.delete(id);

        if (!eliminado) {
            throw new Error("Noticia no existente.");
        }
    }
}
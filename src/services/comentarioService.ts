import { comentarioRepository } from '../data/comentarioRepository';
import { usuarioRepository } from '../data/usuarioRepository'; 
import { noticiaRepository } from '../data/noticiaRepository';
import { Comentario } from '../models/comentario';

export class comentarioService {
    private repository = new comentarioRepository();
    private usuarioRepo = new usuarioRepository();
    private noticiaRepo = new noticiaRepository();

    public async obtenerComentarios(): Promise<Comentario[]> {
        return await this.repository.findAll();
    }


    public async obtenerComentarioPorId(id: number): Promise<Comentario> {
        const comentario = await this.repository.findById(id);

        if (!comentario) {
            throw new Error(`Comentario con ID ${id} no encontrado.`);
        }

        return comentario;
    }


    public async crearComentario(data: Comentario): Promise<Comentario> {

        if (!data.texto || data.texto.trim().length === 0) {
            throw new Error("El comentario no puede estar vacío.");
        }

        if (!data.idUsuario) {
            throw new Error("El idUsuario es obligatorio.");
        }

        if (!data.idNoticia) {
            throw new Error("El idNoticia es obligatorio.");
        }

        const comentarios = await this.repository.findAll();
        if (comentarios.find(c => c.idComentario === data.idComentario)) {
            throw new Error("Ya existe un comentario con ese ID.");
        }

        const usuarioExiste = await this.usuarioRepo.findById(data.idUsuario);
        if (!usuarioExiste) {
            throw new Error("El usuario no existe.");
        }

        const noticiaExiste = await this.noticiaRepo.findById(data.idNoticia);
        if (!noticiaExiste) {
            throw new Error("La noticia no existe.");
        }

        if (!data.fecha) {
            data.fecha = new Date();
        }
        
        await this.repository.create(data);
        return data;
    }


    public async actualizarComentario(comentarioActualizado: Comentario): Promise<void> {
        const existe = await this.repository.findById(comentarioActualizado.idComentario);

        if (!existe) {
            throw new Error("Comentario no encontrado.");
        }

        if (comentarioActualizado.texto !== undefined && comentarioActualizado.texto.trim().length === 0) {
            throw new Error("El comentario no puede estar vacío.");
        }

        if (comentarioActualizado.idUsuario !== undefined) {
            const usuarioExiste = await this.usuarioRepo.findById(comentarioActualizado.idUsuario);
            if (!usuarioExiste) {
                throw new Error("El usuario indicado no existe.");
            }
        }

        if (comentarioActualizado.idNoticia !== undefined) {
            const noticiaExiste = await this.noticiaRepo.findById(comentarioActualizado.idNoticia);
            if (!noticiaExiste) {
                throw new Error("La noticia indicada no existe.");
            }
        }

        await this.repository.update(comentarioActualizado.idComentario, comentarioActualizado);
    }


    public async eliminarComentario(id: number): Promise<void> {
        const eliminado = await this.repository.delete(id);

        if (!eliminado) {
            throw new Error("Comentario no existente.");
        }
    }
}
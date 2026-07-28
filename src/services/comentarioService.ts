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

        const usuarioExiste = await this.usuarioRepo.findById(data.idUsuario);
        const noticiaExiste = await this.noticiaRepo.findById(data.idNoticia);

        if (!data.texto || data.texto.trim().length === 0) {
            throw new Error("El comentario no puede estar vacío.");
        }

        if (!usuarioExiste) {
            throw new Error("El usuario que intenta comentar no existe.");
        }

        if (!noticiaExiste) {
            throw new Error("La noticia que intenta comentar no existe.");
        }
        
        await this.repository.create(data);
        return data;
    }


    public async actualizarComentario(comentarioActualizado: Comentario): Promise<void> {
        const existe = await this.repository.findById(comentarioActualizado.idComentario);

        if (!existe) {
            throw new Error("Comentario no encontrado.");
        };

        await this.repository.update(comentarioActualizado.idComentario, comentarioActualizado);
    }


    public async eliminarComentario(id: number): Promise<void> {
        const eliminado = await this.repository.delete(id);

        if (!eliminado) {
            throw new Error("Comentario no encontrado.");
        }
    }
}
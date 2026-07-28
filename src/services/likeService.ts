import { likeRepository } from '../data/likeRepository';
import { Like } from '../models/like';
import { usuarioRepository } from '../data/usuarioRepository';
import { noticiaRepository } from '../data/noticiaRepository';
import { comentarioRepository } from '../data/comentarioRepository';

export class likeService {
    private repository = new likeRepository();
    private usuarioRepo = new usuarioRepository();
    private noticiaRepo = new noticiaRepository();
    private comentarioRepo = new comentarioRepository();

    public async obtenerLikes(): Promise<Like[]> {
        return await this.repository.findAll();
    }


    public async obtenerLikePorId(id: number): Promise<Like> {
        const like = await this.repository.findById(id);

        if (!like) {
            throw new Error(`Like con ID ${id} no encontrado.`);
        }

        return like;
    }


    public async crearLike(data: Like): Promise<Like> {

        const tiposValidos = ["Noticia", "Comentario"];
        
        if (!tiposValidos.includes(data.tipo)) {
            throw new Error("El tipo debe ser 'Noticia' o 'Comentario'.");
        }

        const usuarioExiste = await this.usuarioRepo.findById(data.idUsuario);

        if (!usuarioExiste) {
            throw new Error("El usuario que intenta dar like no existe.");
        }

        if (data.tipo === "Noticia") {
            const noticiaExiste = await this.noticiaRepo.findById(data.idTipo);
            if (!noticiaExiste) throw new Error("La noticia que intenta marcar con like no existe.");
        } else {
            const comentarioExiste = await this.comentarioRepo.findById(data.idTipo);
            if (!comentarioExiste) throw new Error("El comentario que intenta marcar con like no existe.");
        }

        const todosLosLikes = await this.repository.findAll();
        const yaExisteLike = todosLosLikes.find(l => 
            l.idUsuario === data.idUsuario && 
            l.idTipo === data.idTipo && 
            l.tipo === data.tipo
        );

        if (yaExisteLike) {
            throw new Error("Ya has dado like a este elemento anteriormente.");
        }

        await this.repository.create(data);
        return data;
    }

    public async actualizarLike(likeActualizado: Like): Promise<void> {
        const existe = await this.repository.findById(likeActualizado.idLike);

        if (!existe) {
            throw new Error("No se puede actualizar: el like no existe.");
        }

        await this.repository.update(likeActualizado.idLike, likeActualizado);
    }

    public async eliminarLike(id: number): Promise<void> {
        const eliminado = await this.repository.delete(id);

        if (!eliminado) {
            throw new Error("No se pudo eliminar el like porque no existe.");
        }
    }
}
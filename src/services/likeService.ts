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

        if (!data.idUsuario) {
            throw new Error("El idUsuario es obligatorio.");
        }

        if (!data.idTipo) {
            throw new Error("El idTipo es obligatorio.");
        }

        if (!data.tipo || !tiposValidos.includes(data.tipo)) {
            throw new Error("El tipo debe ser 'Noticia' o 'Comentario'.");
        }

        const todosLosLikes = await this.repository.findAll();

        if (todosLosLikes.find(l => l.idLike === data.idLike)) {
            throw new Error("Ya existe un like con ese ID.");
        }

        const usuarioExiste = await this.usuarioRepo.findById(data.idUsuario);

        if (!usuarioExiste) {
            throw new Error("El usuario no existe.");
        }

        if (data.tipo === "Noticia") {
            const noticiaExiste = await this.noticiaRepo.findById(data.idTipo);
            if (!noticiaExiste) throw new Error("La noticia no existe.");
        } else {
            const comentarioExiste = await this.comentarioRepo.findById(data.idTipo);
            if (!comentarioExiste) throw new Error("El comentario no existe.");
        }

        const yaExisteLike = todosLosLikes.find(l => 
            l.idUsuario === data.idUsuario && 
            l.idTipo === data.idTipo && 
            l.tipo === data.tipo
        );

        if (yaExisteLike) {
            throw new Error("Ya has dado like anteriormente.");
        }

        await this.repository.create(data);
        return data;
    }

    public async actualizarLike(likeActualizado: Like): Promise<void> {
        const existe = await this.repository.findById(likeActualizado.idLike);
        const tiposValidos = ["Noticia", "Comentario"];

        if (!existe) {
            throw new Error("No se puede actualizar: el like no existe.");
        }

        const tipoFinal = likeActualizado.tipo !== undefined ? likeActualizado.tipo : existe.tipo;
        const idTipoFinal = likeActualizado.idTipo !== undefined ? likeActualizado.idTipo : existe.idTipo;
        const idUsuarioFinal = likeActualizado.idUsuario !== undefined ? likeActualizado.idUsuario : existe.idUsuario;

        if (likeActualizado.tipo !== undefined && !tiposValidos.includes(likeActualizado.tipo)) {
            throw new Error("El tipo debe ser 'Noticia' o 'Comentario'.");
        }

        if (likeActualizado.idUsuario !== undefined) {
            const usuarioExiste = await this.usuarioRepo.findById(likeActualizado.idUsuario);
            if (!usuarioExiste) {
                throw new Error("El usuario indicado no existe.");
            }
        }

        if (likeActualizado.idTipo !== undefined || likeActualizado.tipo !== undefined) {
            if (tipoFinal === "Noticia") {
                const noticiaExiste = await this.noticiaRepo.findById(idTipoFinal);
                if (!noticiaExiste) throw new Error("La noticia indicada no existe.");
            } else {
                const comentarioExiste = await this.comentarioRepo.findById(idTipoFinal);
                if (!comentarioExiste) throw new Error("El comentario indicado no existe.");
            }
        }

        const todosLosLikes = await this.repository.findAll();
        const duplicado = todosLosLikes.find(l =>
            l.idLike !== likeActualizado.idLike &&
            l.idUsuario === idUsuarioFinal &&
            l.idTipo === idTipoFinal &&
            l.tipo === tipoFinal
        );

        if (duplicado) {
            throw new Error("Ya existe un like de este usuario.");
        }

        await this.repository.update(likeActualizado.idLike, likeActualizado);
    }

    public async eliminarLike(id: number): Promise<void> {
        const eliminado = await this.repository.delete(id);

        if (!eliminado) {
            throw new Error("Like no existente.");
        }
    }
}
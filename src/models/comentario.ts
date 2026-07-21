export interface Comentario {
    idComentario: number;
    texto: string;
    fecha: Date;
    fechaModificacion: Date;
    idUsuario: number;
    idNoticia: number;
};
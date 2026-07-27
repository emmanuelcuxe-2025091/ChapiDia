import { Estado } from './estado';

export interface Noticia {
    idNoticia: number;
    titulo: string;
    contenido: string;
    fechaNoticia: Date;
    imagenNoticia?: string;
    estado: Estado;
    idUsuario: number;
    idCategoria: number;
};
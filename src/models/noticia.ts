import { Estado } from './estado';

export interface Noticia {
    idNoticia: number;
    titulo: string;
    contenido: string;
    fechaNoticia: string;
    imagenNoticia: string;
    estado: Estado;
    idUsuario: number;
    idCategoria: number;
};
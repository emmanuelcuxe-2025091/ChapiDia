import { Noticia } from '../models/noticia';

export const noticias: Noticia[] = [
    {
        idNoticia: 1,
        titulo: "Viaje a la naturaleza",
        contenido: "Una fotografía de paisajes y fauna.",
        fechaNoticia: new Date("2026-06-17"),
        imagenNoticia: "foto.jpg",
        estado: "Publicado",
        idUsuario: 1,
        idCategoria: 1
    }
];
import { Rol } from './rol';

export interface Usuario {
    idUsuario: number;
    nombre: string;
    email: string;
    contrasena: string;
    rol: Rol;
};
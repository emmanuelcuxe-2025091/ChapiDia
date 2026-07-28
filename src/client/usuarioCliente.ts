import { Usuario } from "../models/usuario";

export class usuarioCliente {
    private URL = "http://localhost:3000/usuarios";

    public async obtenerUsuarios(): Promise<Usuario[]> {
        const respuesta = await fetch(this.URL);

        return await respuesta.json();
    }


    public async obtenerUsuarioPorId(id: number): Promise<Usuario> {
        const respuesta = await fetch(`${this.URL}/${id}`);

        if (!respuesta.ok) {
            throw new Error("Usuario no encontrado");
        }

        return await respuesta.json();
    }


    public async crearUsuario(usuario: Usuario): Promise<any> {
        const respuesta = await fetch(this.URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        return await respuesta.json();
    }


    public async actualizarUsuario(id: number, usuario: Usuario): Promise<any> {
        const respuesta = await fetch(`${this.URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        return await respuesta.json();
    }
    

    public async eliminarUsuario(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL}/${id}`, {
            method: "DELETE"
        });

        return await respuesta.json();
    }
}
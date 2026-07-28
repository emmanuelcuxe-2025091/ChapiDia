import { createServer } from "http";
import { mainRouter } from "./router";

export function iniciar(): Promise<void> {
    return new Promise ((resolve) => {
        const servidor = createServer(async (req, res) => {

            res.setHeader("Content-Type", "application/json");

            await mainRouter(req, res);

        });

        servidor.listen(3000, () => {

            console.log("===================================");

            console.log("Servidor iniciado");

            console.log("http://localhost:3000");

            console.log("===================================");

            resolve();
        });
    });
};
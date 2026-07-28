import { iniciar } from "./api/server";
import { menu } from "./menu/menu";

async function main() {
    
    await iniciar();
    await menu();
    
}

main();
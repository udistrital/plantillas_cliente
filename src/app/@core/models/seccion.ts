import { Campo } from "./campo";
import { EstiloFuente } from "./estiloFuente";

export class Seccion {
    Posicion: string;
    Nombre: string;
    Descripcion: string;
    Campos: Campo[];
    EstiloFuente: EstiloFuente;
    FechaCreacion: string;
    FechaModificacion: string;
    Activo: boolean;
}
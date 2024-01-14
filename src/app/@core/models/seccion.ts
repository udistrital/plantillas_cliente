import { Campo } from "./campo";
import { EstiloFuente } from "./estiloFuente";

export interface Seccion {
    posicion: number;
    nombre: string;
    descripcion: string;
    campos: Campo[];
    subSecciones?: Seccion[];
    estiloFuente: EstiloFuente;
    fechaCreacion: string;
    fechaModificacion: string;
    activo: boolean;
}
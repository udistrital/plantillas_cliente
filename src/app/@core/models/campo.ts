import { EstiloFuente } from "./estiloFuente";

export class Campo {
    Posicion: number;
    Nombre: string;
    Descripcion: string;
    DataString: string;
    DataBinary: string;
    EstiloFuente: EstiloFuente;
    FechaCreacion: string;
    FechaModificacion: string;
    Activo: boolean;
}
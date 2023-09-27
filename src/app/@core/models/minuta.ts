import { CampoAdicional } from "./campoAdicional";
import { EstiloFuente } from "./estiloFuente";

export class Minuta {
    Id: number;
    Nombre: string;
    Descripcion: string;
    Valor: string;
    CamposAdicionales: CampoAdicional;
    EstiloFuente: EstiloFuente;
    FechaCreacion: string;
    FechaModificacion: string;
    Activo: boolean;
}
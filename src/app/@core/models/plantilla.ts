import { Seccion } from "./seccion";

export class Plantilla {
  Id: number;
  Tipo: string;
  Nombre: string;
  Descripcion: string;
  Secciones: Seccion[];
  EnlaceDoc: string;
  Version: number;
  versionActual: boolean;
  FechaCreacion: string;
  FechaModificacion: string;
}
import { Seccion } from "./seccion";
import { Minuta } from "./minuta";
import { Titulo } from "./titulo";
import { Imagen } from "./Imagen";

export class Plantilla {
  Id: number;
  Nombre: string;
  Descripcion: string;
  Secciones: Seccion;
  Minutas: Minuta;
  Titulos: Titulo;
  Imagenes: Imagen;
  EnlaceDoc: string;
  Version: number;
  FechaCreacion: string;
  FechaModificacion: string;
  Activo: boolean;
}
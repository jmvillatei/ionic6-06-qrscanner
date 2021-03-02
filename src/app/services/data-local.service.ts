import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.module';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros: Registro[] = [];

  constructor() { }

  guardarRegistro(format: string, text: string) {
    const nuevoRegsitro = new Registro(format, text);
    this.registros.unshift(nuevoRegsitro);

    console.log(this.registros);
    
  }
}

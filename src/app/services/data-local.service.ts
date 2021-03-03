import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.module';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private inAppBrowser: InAppBrowser
  ) {
    // cargar registros
    this.cargarStorage();
  }

  async cargarStorage() {
    this.registros = await this.storage.get('registros') || [];
  }

  async guardarRegistro(format: string, text: string) {
    await this.cargarStorage();
    const nuevoRegsitro = new Registro(format, text);
    this.registros.unshift(nuevoRegsitro);

    console.log(this.registros);

    // set a key/value
    this.storage.set('registros', this.registros);

    this.abrirRegistro(nuevoRegsitro);
  }

  abrirRegistro(registro: Registro) {
    this.navCtrl.navigateForward('/tabs/tab2');

    switch (registro.type) {
      case 'http':
        //abrir navegador web
        this.inAppBrowser.create(registro.text, '_system');
        break;

      default:
        break;
    }
  }
}

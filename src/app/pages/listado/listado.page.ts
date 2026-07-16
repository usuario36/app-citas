import { Component } from '@angular/core';
import { StorageService } from '../../services/storage';
import { AlertController } from '@ionic/angular'; // 1. Importar AlertController

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  standalone: false
})
export class ListadoPage {
  avisos: any[] = [];

  constructor(
    private storageService: StorageService,
    private alertController: AlertController // 2. Inyectar en constructor
  ) {}

  async ionViewWillEnter() {
    this.avisos = await this.storageService.obtenerAvisos();
  }

  // 3. Modificar la función eliminar para incluir la alerta
  async eliminar(aviso: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este aviso?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: async () => {
            await this.storageService.eliminarAviso(aviso.id);
            this.avisos = await this.storageService.obtenerAvisos(); // Recargar lista
          }
        }
      ]
    });

    await alert.present();
  }
  
  // ... (tu función editar sigue igual)
}
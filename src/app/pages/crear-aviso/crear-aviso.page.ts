import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage';
import { PhotoService } from '../../services/photo'; 
import { Aviso } from '../../models/aviso.model';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
  standalone: false
})
export class CrearAvisoPage {
  formularioAviso: FormGroup;
  avisoEdicion: any = null;
  fotoActual: string | undefined = '';

  constructor(
    private fb: FormBuilder, 
    private storageService: StorageService, 
    private photoService: PhotoService,
    private router: Router
  ) {
    this.formularioAviso = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]]
    });

    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.avisoEdicion = nav.extras.state['aviso'];
      this.fotoActual = this.avisoEdicion.foto;
      this.formularioAviso.patchValue({
        titulo: this.avisoEdicion.titulo,
        descripcion: this.avisoEdicion.descripcion
      });
    }
  }

  async sacarFoto() {
    this.fotoActual = await this.photoService.tomarFoto();
  }

  async guardarAviso() {
    if (this.formularioAviso.valid) {
      const avisoData = {
        ...this.formularioAviso.value,
        foto: this.fotoActual
      };

      if (this.avisoEdicion) {
        await this.storageService.actualizarAviso({ ...this.avisoEdicion, ...avisoData });
        alert('¡Aviso actualizado!');
      } else {
        const nuevoAviso: Aviso = { 
          id: Date.now(), 
          ...avisoData, 
          fecha: new Date().toISOString() 
        };
        await this.storageService.guardarAviso(nuevoAviso);
        alert('¡Aviso guardado con éxito!');
      }
      this.formularioAviso.reset();
      this.router.navigate(['/listado']);
    }
  }
}

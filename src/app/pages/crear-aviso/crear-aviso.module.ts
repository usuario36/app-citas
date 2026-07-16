import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importante incluir ambos
import { IonicModule } from '@ionic/angular';
import { CrearAvisoRoutingModule } from './crear-aviso-routing.module';
import { CrearAvisoPage } from './crear-aviso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CrearAvisoRoutingModule
  ],
  declarations: [CrearAvisoPage] // <--- Esto es lo que faltaba o estaba en conflicto
})
export class CrearAvisoPageModule {}
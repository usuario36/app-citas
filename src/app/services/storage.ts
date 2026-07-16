import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guardar un nuevo aviso
  async guardarAviso(aviso: any) {
    let avisos = await this.obtenerAvisos() || [];
    avisos.push(aviso);
    await this._storage?.set('avisos', avisos);
  }

  // Obtener todos los avisos
  async obtenerAvisos() {
    return await this._storage?.get('avisos') || [];
  }

  // Eliminar un aviso por su ID
  async eliminarAviso(id: number) {
    let avisos = await this.obtenerAvisos();
    avisos = avisos.filter((aviso: any) => aviso.id !== id);
    await this._storage?.set('avisos', avisos);
  }

  // NUEVA FUNCIÓN: Actualizar un aviso existente
  async actualizarAviso(avisoActualizado: any) {
    let avisos = await this.obtenerAvisos();
    // Buscamos el índice del aviso por su ID
    const index = avisos.findIndex((a: any) => a.id === avisoActualizado.id);
    
    if (index !== -1) {
      // Reemplazamos el antiguo por el nuevo en la misma posición
      avisos[index] = avisoActualizado;
      await this._storage?.set('avisos', avisos);
    }
  }
}

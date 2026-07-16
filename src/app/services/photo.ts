import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  async tomarFoto(): Promise<string | undefined> {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt, 
        quality: 90
      });

      if (capturedPhoto.base64String) {
        return 'data:image/jpeg;base64,' + capturedPhoto.base64String;
      }
    } catch (error) {
      console.log('Usuario canceló o hubo error:', error);
    }
    return undefined;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSource = new BehaviorSubject<string | null>(null);
  currentNotification = this.notificationSource.asObservable();

  showNotification(message: string) {
    this.notificationSource.next(message);
    setTimeout(() => this.notificationSource.next(null), 3000); // Ocultar después de 3 segundos
  }
}

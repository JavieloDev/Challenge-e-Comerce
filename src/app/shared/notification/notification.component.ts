import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  showNotification = false;
  notificationTitle = '';
  notificationMessage = '';

  show(title: string, message: string): void {
    this.notificationTitle = title;
    this.notificationMessage = message;
    this.showNotification = true;

    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
      this.closeNotification();
    }, 3000);
  }

  closeNotification(): void {
    this.showNotification = false;
  }


}

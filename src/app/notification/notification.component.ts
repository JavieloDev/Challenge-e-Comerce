import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  notifications: string[] = []; // Array para almacenar las notificaciones
  showNotification = false;
  notificationTitle = 'Notificación';
  notificationMessage = 'Este es un mensaje de notificación.';


  showNotificationMessage(title: string, message: string) {
    this.notificationTitle = title;
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => this.closeNotification(), 5000); // Cierra la notificación después de 5 segundos
  }

  closeNotification() {
    this.showNotification = false;
  }
  addNotification(message: string) {
    this.notifications.push(message); // Agregar una nueva notificación
    setTimeout(() => {
      this.notifications.shift(); // Eliminar la notificación después de un tiempo
    }, 3000); // Duración en milisegundos
  }
}


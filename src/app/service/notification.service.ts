import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NotificationComponent} from "../shared/notification/notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSource = new BehaviorSubject<string | null>(null);
  currentNotification = this.notificationSource.asObservable();

  private notificationComponent!: NotificationComponent;

  registerNotification(notification: NotificationComponent) {
    this.notificationComponent = notification;
  }

  showNotInter(title: string, message: string) {
    if (this.notificationComponent) {
      this.notificationComponent.showNotificationMessage(title, message);
    }
  }

  showNotification(message: string) {
    this.notificationSource.next(message);
    setTimeout(() => this.notificationSource.next(null), 3000);
    alert(message);
  }

}

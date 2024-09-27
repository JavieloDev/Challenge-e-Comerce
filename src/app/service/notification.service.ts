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

  showNotification(message: string) {
    this.notificationSource.next(message);
    setTimeout(() => this.notificationSource.next(null), 3000);
  }

  showNotInter(title: string, message: string): void {
    if (this.notificationComponent) {
      this.notificationComponent.show(title, message);
    }
  }
}

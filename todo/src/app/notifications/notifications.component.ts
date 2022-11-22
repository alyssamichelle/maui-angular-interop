import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  
  constructor( public ourNotificationsService: NotificationsService) {}



}

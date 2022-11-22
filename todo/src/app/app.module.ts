import { ElementRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationModule, NOTIFICATION_CONTAINER } from '@progress/kendo-angular-notification';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { HttpClientModule } from '@angular/common/http';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FormsModule } from '@angular/forms';

import { MauiInteropToken } from '../token-file';

const MauiInterop = (window as any).MauiInterop;

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule,
    NotificationModule,
    InputsModule,
    ButtonsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    FormsModule
  ],
  providers: [
    {provide: Window, useValue: window },
    {
      provide: NOTIFICATION_CONTAINER,
      useFactory: () => {
         //return the container ElementRef, where the notification will be injected
         return { nativeElement: document.body } as ElementRef;
      }
    },
    { provide: MauiInteropToken, useValue: MauiInterop }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

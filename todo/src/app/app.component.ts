import { Component, Inject, OnInit } from '@angular/core';
import { ItemService } from './item.service';
import { Item } from './item';
import { NotificationsService } from './notifications.service';
import { MauiInteropToken } from 'src/token-file';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todo';
  public list: any = [];
  public newItem: Item = {};
  public w: Window;

  constructor(
    private itemService: ItemService,
    private ourNotificationService: NotificationsService,
    @Inject(MauiInteropToken) public mauiInterop: any  ) {}

  ngOnInit(): void {
    this.getList();
    
  }

  getThatBattery(): void {
    this.mauiInterop.checkBattery();
    // alert("getThatBattery called, yuh");
  }

  getThatNumber(): void {
    this.mauiInterop.checkNumber().then((something) => {
      // alert(something);
      // this.ourNotificationService.add(something);
    });
  }

  getDeviceInfo(): void {
    this.mauiInterop.grabDeviceInfo().then((something) => {
      this.ourNotificationService.add(something);
      alert('THIS IS AMAZING');
    });
  }

  getList(): void {
    this.itemService.getList().subscribe((list) => {
      this.list = list;
    });
  }

  addItem(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.itemService.addItem({ name } as Item).subscribe((item) => {
      this.list.push(item);
    });
  }
}

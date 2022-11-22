import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from './item';

@Injectable({ providedIn: 'root', })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { 
      items: [
        {
          "id": 0,
          "name": "Flesh out UI",
          "description": "Todo items need all actions created & KUI components added.",
        },
        {
          "id": 1,
          "name": "Build for --prod",
          "description": "ng build --configuration production",
        },
        {
          "id": 2,
          "name": "Generate .NET MAUI Shell & Wrap",
          "description": "dotnet new maui-blazor -n WrapperApp",
        },
        {
          "id": 3,
          "name": "Generate IPA",
          "description": "dotnet build -t:Run -f net6.0-ios WRAPPERAPP.csproj",
        },
        {
          "id": 4,
          "name": "Deploy to App Store",
          "description": "https://appstoreconnect.apple.com/login",
        },
        {
          "id": 5,
          "name": "Upload IPA",
          "description": "Using the transporter app.",
        },
    ]};
  }
}

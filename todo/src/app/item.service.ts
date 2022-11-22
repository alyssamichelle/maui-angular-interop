import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { NotificationsService } from './notifications.service';
import { Item } from './item';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({ providedIn: 'root' })
export class ItemService {

  private itemsUrl = 'api/items';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( 
    private http: HttpClient, 
    private notificationsService: NotificationsService,
    public kuins: NotificationService ) { }

  /** GET items from the server */
  getList(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl)
      .pipe(
        tap(result => this.showNotification(`List has been gotten, length: ${result.length}`)),
        catchError(this.handleError<Item[]>('getList', []))
      );
  }

  /** GET item by id. Return `undefined` when id not found */
  getItemNo404<Data>(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/?id=${id}`;
    return this.http.get<Item[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.showNotification(`${outcome} item id=${id}`, "success");
        }),
        catchError(this.handleError<Item>(`getItem id=${id}`))
      );
  }

  /** GET item by id. Will 404 if id not found */
  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.showNotification(`fetched item id=${id}`, "success")),
      catchError(this.handleError<Item>(`getItem id=${id}`))
    );
  }

  /* GET item whose name contains search term */
  searchList(term: string): Observable<Item[]> {
    if (!term.trim()) {
      // if not search term, return all heroes.
      return this.getList();
    }
    return this.http.get<Item[]>(`${this.itemsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.showNotification(`found items matching "${term}"`, "success") :
         this.showNotification(`no items matching "${term}"`, "error")),
      catchError(this.handleError<Item[]>('searchList', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new item to the server */
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, this.httpOptions).pipe(
      tap((newItem: Item) => this.showNotification(`added item w/ id=${newItem.id}`, "success")),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteItem(item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions).pipe(
      tap(_ => this.showNotification(`deleted item id=${id}`, "info")),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  /** PUT: update the item on the server */
  updateItem(item: Item): Observable<any> {
    return this.http.put(this.itemsUrl, item, this.httpOptions).pipe(
      tap(_ => this.showNotification(`updated item id=${item.id}`, "success")),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.showNotification(`${operation} failed: ${error.message}`, "error");

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  /** Show notification with the NotificationsService from KUI */
  public showNotification(message: string, type: any = "success"): void {
    
    console.log(`showNotification: message-${message} type-${type}`);

    this.kuins.show({
      content: message,
      hideAfter: 6000,
      position: { horizontal: "center", vertical: "bottom" },
      animation: { type: "fade", duration: 400 },
      type: { style: type, icon: true }
    });
  }

}

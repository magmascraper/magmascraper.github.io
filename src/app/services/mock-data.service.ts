import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebItems } from '../models/web-items';
import { catchError, map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Loader } from '../models/loader';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private readonly loader: Loader<WebItems[]> = new Loader();
  private searchText: string;

  constructor(private httpClient: HttpClient) {
    this.searchText = '';
  }

  getLoader(searchText: string): Observable<Loader<WebItems[]>> {

    this.searchText = searchText;
    this.loader.isLoading = true;
    this.loader.isError = false;

    return this.httpClient
      .get<WebItems[]>(`${env.webItemsUrl}?search=${searchText}`)
      .pipe(
        startWith([]),
        map(this.mapItems),
        catchError(this.catchError)
      );
  }

  private mapItems = (items: WebItems[]) => {
    if (!items) {
      items = [];
    }
    items.forEach(i => i.description = !this.searchText ? i.description : this.searchText);
    this.loader.data = items;
    return this.loader;
  }

  private catchError = (error: any) => {
    this.loader.isError = true;
    this.loader.data = error;
    return of(this.loader);
  }

}

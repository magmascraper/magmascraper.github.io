import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WebItems } from '../models/web-items';
import { catchError, map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Loader } from '../models/loader';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getDataLoader(searchText: string): Observable<Loader<WebItems[]>> {

    const loader: Loader<WebItems[]> = new Loader();
    loader.isLoading = true;
    loader.isError = false;

    return this.httpClient
      .get<WebItems[]>(`${env.webItemsUrl}?search=${searchText}`)
      .pipe(
        startWith([]),
        map((items: WebItems[]) => {
          items.forEach(i => {
            i.description = !searchText ? i.description : searchText;
          });
          loader.data = items;
          return loader;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          loader.isError = true;
          loader.data = error;
          return of(loader);
        })
      );

  }

}

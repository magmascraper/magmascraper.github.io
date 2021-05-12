import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WebItems } from '../models/web-items';
import { catchError, defaultIfEmpty, map, startWith } from 'rxjs/operators';
import { concat, Observable, of } from 'rxjs';
import { Loader } from '../models/loader';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor(private readonly httpClient: HttpClient) {
  }
/*
  getData(searchText: string): Observable<WebItems[]> {
    return this.httpClient
      // .get<WebItems[]>(`http://magmabytes.com/data?search=${searchText}`)
      .get<WebItems[]>(`http://localhost:9090/data?search=${searchText}`)
      .pipe(
        // startWith([]),
        map(item => {
          item.forEach(i => {
            i.description = !searchText ? i.description : searchText;
          });
          return item;
        }),
        catchError(error => {
          return of(error);
        })
      );
  }*/

  getDataLoader(searchText: string): Observable<Loader<WebItems[]>> {

    const loader: Loader<WebItems[]> = new Loader();
    loader.isLoading = true;
    loader.isError = false;

    return this.httpClient
      .get<WebItems[]>(`http://magmabytes.com/data?search=${searchText}`)
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

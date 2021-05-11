import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebItems } from '../models/web-items';
import { catchError, defaultIfEmpty, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Loader } from '../models/loader';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getData(searchText: string): Observable<WebItems[]> {
    return this.httpClient
      // .get<WebItems[]>(`http://magmabytes.com/data?search=${searchText}`)
      .get<WebItems[]>(`http://localhost:9090/data?search=${searchText}`)
      .pipe(
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
  }

  getDataLoader(searchText: string): Observable<Loader<WebItems[]>> {
    const loader: Loader<WebItems[]> = new Loader();
    loader.isLoading = true;
    return this.httpClient
      // .get<WebItems[]>(`http://magmabytes.com/data?search=${searchText}`)
      .get<WebItems[]>(`http://localhost:9090/data?search=${searchText}`)
      .pipe(
        map((items: WebItems[]) => {
          items.forEach(i => {
            i.description = !searchText ? i.description : searchText;
          });
          loader.data = items;
          return loader;
        }),
        catchError(error => {
          return of(error);
        })
      );
  }

}

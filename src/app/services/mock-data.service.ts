import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebItems } from '../models/web-items';
import { catchError, defaultIfEmpty, map, startWith } from 'rxjs/operators';
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
  }

}

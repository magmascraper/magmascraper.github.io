import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor(private readonly httpClient: HttpClient) {

  }

  getData(searchText: string): Promise<any> {
    return this.httpClient
            .get(`http://localhost:9090/data?search=${searchText}`)
            .toPromise()

  }

}

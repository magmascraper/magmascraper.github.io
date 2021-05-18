import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MockDataService } from './mock-data.service';
import { WebItems } from '../models/web-items';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

describe('MockDataService', () => {
  let service: MockDataService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });


    service = TestBed.inject(MockDataService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when the text to search is empty, the service should return a valid array', () => {

    // given
    const textToSearch = '';
    let webItems: WebItems[] = [];

    // when
    service.getDataLoader(textToSearch).subscribe(loader => {
      webItems = loader.data;

      // then
      expect(webItems).toBeTruthy();
      expect(Array.isArray(webItems)).toEqual(true);
    });

  });

  it('when remote api returns nulls, the service should returns a valid array', () => {

    // given
    const textToSearch = '';
    let httpClientSpy: { get: jasmine.Spy };
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const otherService = new MockDataService(httpClientSpy as any);
    httpClientSpy.get.and.returnValue(of(null));

    // when
    otherService.getDataLoader(textToSearch)
      .subscribe(
        loader => {

          // then
          expect(loader.data).toEqual([]);
          expect(Array.isArray(loader.data)).toEqual(true);
        }
      );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('when service return empty array', () => {

    // given
    const textToSearch = '';
    let httpClientSpy: { get: jasmine.Spy };
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const otherService = new MockDataService(httpClientSpy as any);
    httpClientSpy.get.and.returnValue(of([]));

    // when
    otherService.getDataLoader(textToSearch)
      .subscribe(
        loader => {

          // then
          expect(loader.data).toEqual([]);
        }
      );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('error handling for 404', () => {

    // given
    const textToSearch = '';
    let httpClientSpy: { get: jasmine.Spy };
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const otherService = new MockDataService(httpClientSpy as any);
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    httpClientSpy.get.and.returnValue(of(errorResponse));

    // when
    otherService.getDataLoader(textToSearch)
    .subscribe(
      loader => {

        // then
        if (Array.isArray(loader.data)) {
          expect(loader.isError).toEqual(false);
        } else {
          expect(loader.isError).toEqual(true);
        }

      });

      expect(httpClientSpy.get.calls.count()).toBe(1);

  });

});


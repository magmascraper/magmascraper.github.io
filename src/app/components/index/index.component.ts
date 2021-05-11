import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebItems } from '../../models/web-items';
import { MockDataService } from 'src/app/services/mock-data.service';
import { Loader } from 'src/app/models/loader';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  textSearchSubject: Subject<any>;
  loader: Loader<Observable<WebItems[]>>;
  textToSearch: string = '';
  observable: Observable<WebItems[]> = new Observable();

  constructor(private readonly mockDataService: MockDataService) {
    this.textSearchSubject = new Subject();
    this.loader = new Loader();
    this.loader.isLoading = false;
  }

  ngOnInit(): void {
    this.loader.isLoading = true;
    this.textSearchSubject.subscribe(text => {
      this.observable = this.mockDataService.getData(text);
      this.textToSearch = text;
      this.loader.isLoading = true;
      this.loader.data = this.observable;
    });
    this.textSearchSubject.next('');
  }
}

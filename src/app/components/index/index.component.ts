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
  textSearchSubject: Subject<string>;
  textToSearch: string;
  observableLoader: Observable<Loader<WebItems[]>>;

  constructor(private readonly mockDataService: MockDataService) {
    this.textSearchSubject = new Subject();
    this.textToSearch = '';
    this.observableLoader = new Observable();
  }

  ngOnInit(): void {
    this.textSearchSubject.subscribe(text => {
      this.textToSearch = text;
      this.observableLoader = this.mockDataService.getLoader(text);
    });
    this.textSearchSubject.next('');
  }
}

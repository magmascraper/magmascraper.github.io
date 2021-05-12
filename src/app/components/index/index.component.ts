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
  isLoading = false;

  constructor(private readonly mockDataService: MockDataService) {
    this.textSearchSubject = new Subject();
    this.loader = new Loader();
  }

  ngOnInit(): void {
    this.textSearchSubject.subscribe(text => {
      const observable: Observable<WebItems[]> = this.mockDataService.getData(text);
      this.loader = new Loader();
      this.textToSearch = text;
      this.loader.isLoading = true;
      this.loader.data = observable;
      console.log('passing object', this.loader);
    });
    this.textSearchSubject.next('');
  }
}

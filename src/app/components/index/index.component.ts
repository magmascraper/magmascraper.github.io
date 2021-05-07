import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WebItems } from '../../models/web-items';
import { MockDataService } from 'src/app/services/mock-data.service';
import { WebItemsWrapper } from 'src/app/models/web-items-wrapper';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  textSearchSubject: Subject<any>;
  webItemsWrapper: any;

  constructor(private readonly mockDataService: MockDataService) {
    this.textSearchSubject = new Subject();
    this.webItemsWrapper = new WebItemsWrapper();
  }

  ngOnInit(): void {
    this.textSearchSubject.subscribe(text => {
      this.mockDataService.getData(text)
        .then((webItems: WebItems[]) => {
          this.webItemsWrapper = {
            webItems: webItems,
            isError: false,
            textToSearch: text
          };
        })
        .catch(error => {
          this.webItemsWrapper = {
            isError: true,
            error: error
          };
        });
    });
    this.textSearchSubject.next('');
  }
}

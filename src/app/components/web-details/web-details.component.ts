import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WebItemsWrapper } from 'src/app/models/web-items-wrapper';

@Component({
  selector: 'app-web-details',
  templateUrl: './web-details.component.html',
  styleUrls: ['./web-details.component.sass']
})
export class WebDetailsComponent implements OnInit, OnChanges {

  @Input() webItemsWrapper: WebItemsWrapper = new WebItemsWrapper();
  error: any = {};

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const propName = 'webItemsWrapper';
    if (changes[propName]) {
      const currentValue = changes[propName].currentValue;
      if (!currentValue.isError) {
        this.webItemsWrapper = {
          isError: currentValue.isError,
          webItems: currentValue.webItems,
          textToSearch: currentValue.textToSearch
        };
      } else {
        this.error = currentValue.error;
      }
    }
  }

}

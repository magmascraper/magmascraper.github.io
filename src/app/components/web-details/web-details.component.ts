import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Loader } from 'src/app/models/loader';
import { WebItems } from 'src/app/models/web-items';

@Component({
  selector: 'app-web-details',
  templateUrl: './web-details.component.html',
  styleUrls: ['./web-details.component.sass']
})
export class WebDetailsComponent implements OnInit/*, OnChanges*/ {

  @Input() textToSearch: string = '';
  @Input() observableLoader: Observable<Loader<WebItems[]>> = new Observable();
  error: any = {};

  constructor() {
  }

  ngOnInit(): void {
  }
/*
  ngOnChanges(changes: SimpleChanges): void {
    const propName = 'loader';
    if (changes[propName]) {
      const currentValue = changes[propName].currentValue;
      console.log('onChanges', currentValue);
      if (currentValue.isError == false) {
        this.loader.data = currentValue.data;
        this.loader.isLoading = false;
        this.loader.isError = false;
        this.data = currentValue.data;
      } else {
        this.error = currentValue.error;
        this.loader.isError = true;
      }
    }
  }*/

}

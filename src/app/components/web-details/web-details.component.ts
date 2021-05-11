import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Loader } from 'src/app/models/loader';
import { WebItems } from 'src/app/models/web-items';

@Component({
  selector: 'app-web-details',
  templateUrl: './web-details.component.html',
  styleUrls: ['./web-details.component.sass']
})
export class WebDetailsComponent implements OnInit /*,OnChanges*/ {

  @Input() textToSearch: string = '';
  @Input() loader: Loader<Observable<WebItems[]>> = new Loader();
  error: any = {};

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const propName = 'loader';
    if (changes[propName]) {
      const currentValue = changes[propName].currentValue;
      if (!currentValue.isError) {
        this.loader = currentValue;
        this.loader.isLoading = false;
      } else {
        this.error = currentValue.error;
      }
    }
  }

}

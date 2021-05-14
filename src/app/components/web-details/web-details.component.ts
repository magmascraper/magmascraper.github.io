import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Loader } from 'src/app/models/loader';
import { WebItems } from 'src/app/models/web-items';

@Component({
  selector: 'app-web-details',
  templateUrl: './web-details.component.html',
  styleUrls: ['./web-details.component.sass']
})
export class WebDetailsComponent implements OnInit {

  @Input() textToSearch: string;
  @Input() observableLoader: Observable<Loader<WebItems[]>>;

  constructor() {
    this.observableLoader = new Observable();
    this.textToSearch = '';
  }

  ngOnInit(): void {
  }

}

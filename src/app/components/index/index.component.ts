import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {

  textSearchSubject: Subject<string>;
  webItems: any;

  constructor() {
    this.textSearchSubject = new Subject();
    this.webItems = '';
  }

  ngOnInit(): void {
    this.textSearchSubject.subscribe(result => {
      this.webItems = result;
    });
  }

}

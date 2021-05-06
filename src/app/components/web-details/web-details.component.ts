import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-web-details',
  templateUrl: './web-details.component.html',
  styleUrls: ['./web-details.component.sass']
})
export class WebDetailsComponent implements OnInit {

  @Input() webItems:any;

  constructor() {
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Subject, } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {

  @Input() textSearchSubject: Subject<any> = new Subject();
  formControl: FormControl = new FormControl('');
  textSubject: Subject<string> = new Subject();
  error: any;

  constructor() {}

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe(() => {
      if (this.formControl.value === '') {
        this.textSearchSubject.next('');
      }
      this.textSubject.next(this.formControl.value);
    });

    this.textSubject
      .pipe(
        debounceTime(1100),
        filter(text => text.length > 2),
        distinctUntilChanged()
      ).subscribe((text: any) => {
        this.textSearchSubject.next(text);
      }, (error) => {
        console.log('Error:', error);
        this.error = error;
      });
  }

}

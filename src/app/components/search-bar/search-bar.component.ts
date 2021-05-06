import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Subject, } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {

  formControl: FormControl = new FormControl('');
  searchedString: string = '';
  searchSubject: Subject<string> = new Subject();
  @Output() textToSearch = new EventEmitter<string>();
  @Input() textSearchSubject: Subject<string> = new Subject();

  constructor(private readonly mockDataService: MockDataService) {
  }

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe(() => {
      if (!this.validateSearch()) {
        return;
      }
      this.searchSubject.next(this.formControl.value);
    });

    this.searchSubject
      .pipe(
        debounceTime(1100),
        filter(text => text.length > 2),
        distinctUntilChanged(),
        switchMap((text) => {
          return this.mockDataService.getData(text);
      })
      ).subscribe(json => {
        this.textSearchSubject.next(json);
      }, (error) => {
        console.log('Error:', error);
      });
  }

  private validateSearch(): boolean {

    let flag = false;

    if (!this.formControl.value || this.searchedString == this.formControl.value) {
      this.searchedString = this.formControl.value;
      flag = false;
    }

    if (this.formControl.value.length < 3) {
      flag = false;
    }

    if ((this.formControl.value == 'Enter' && this.formControl.value.length > 3) || this.formControl.value.length > 2) {
      flag = true;
    }

    this.searchedString = this.formControl.value;
    return flag;
  }

}

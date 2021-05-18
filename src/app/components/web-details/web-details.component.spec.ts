import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDetailsComponent } from './web-details.component';

describe('WebDetailsComponent', () => {
  let component: WebDetailsComponent;
  let fixture: ComponentFixture<WebDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('text to search should shown', () => {
    // given
    const textToSearch = 'hello';
    const fixture = TestBed.createComponent(WebDetailsComponent);
    const comp = fixture.componentInstance;

    // when
    comp.textToSearch = textToSearch;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    // then
    expect(compiled.querySelector('#resultSearchText').textContent).toContain(textToSearch);
  });


  it('no text to search', () => {
    // given
    const textToSearch = 'All results, use search to fillter';
    const fixture = TestBed.createComponent(WebDetailsComponent);
    const comp = fixture.componentInstance;

    // when
    comp.textToSearch = textToSearch;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    // then
    expect(compiled.querySelector('#resultSearchText').textContent).toContain(textToSearch);
  });

});

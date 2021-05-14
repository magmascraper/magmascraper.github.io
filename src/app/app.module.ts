import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WebDetailsComponent } from './components/web-details/web-details.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MockDataService } from '../app/services/mock-data.service';

const appModules = [
  AppComponent,
  IndexComponent,
  NavbarComponent,
  SearchBarComponent,
  WebDetailsComponent
];

const materialModules = [
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatCardModule,
  MatChipsModule,
  MatGridListModule,
  FlexLayoutModule
];

const services = [
  MockDataService
];

const imports = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  ...materialModules
];


@NgModule({
  declarations: [
    ...appModules
  ],
  imports: [
    ... imports
  ],
  providers: [
    ...services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

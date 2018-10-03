import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {BodyComponent} from './body/body.component';
import {FooterComponent} from './footer/footer.component';

import {TodoserviceService} from './todoservice.service';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
	declarations: [
	AppComponent,
	HeaderComponent,
	BodyComponent,
	FooterComponent
	],
	imports: [
	BrowserModule,
	FormsModule,
	HttpModule,
	HttpClientModule
	],
	providers: [TodoserviceService],
	bootstrap: [AppComponent]
	})
export class AppModule {
}

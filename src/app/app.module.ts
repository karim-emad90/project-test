import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { HoursListComponent } from './hours-list/hours-list.component';
import { MinutesListComponent } from './minutes-list/minutes-list.component';
import { TimeListComponent } from './time-list/time-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DateTimeComponent,
    HoursListComponent,
    MinutesListComponent,
    TimeListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    PortalModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

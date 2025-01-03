import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private hoursItem = new Subject<string>();
  private minutesItem = new Subject<string>();
  private timeItem = new Subject<string>();

  data$ = this.hoursItem.asObservable();
  minute$ = this.minutesItem.asObservable();
  time$ = this.timeItem.asObservable();

  setHoursData(data: string) {
    this.hoursItem.next(data);
  }

  setMinutesData(data: string) {
    this.minutesItem.next(data);
  }

  setTimeData(data: string) {
    this.timeItem.next(data);
  }
}

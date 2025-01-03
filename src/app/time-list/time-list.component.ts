import { ListsService } from './../lists.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-time-list',
  templateUrl: './time-list.component.html',
  styleUrl: './time-list.component.css',
})
export class TimeListComponent {
  constructor(private ListsService: ListsService) {}
  timeList: Array<any> = ['am', 'pm'];

  onItemClicked(item: string) {
    this.ListsService.setTimeData(item);
  }
}

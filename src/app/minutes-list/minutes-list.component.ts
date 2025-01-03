import { Component, OnInit } from '@angular/core';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-minutes-list',
  templateUrl: './minutes-list.component.html',
  styleUrl: './minutes-list.component.css',
})
export class MinutesListComponent implements OnInit {
  constructor(private listsService: ListsService) {}
  minutesList: Array<any> = [];

  ngOnInit() {
    for (let j = 0; j < 60; j++) {
      if (j.toString().length === 1) {
        let newValue = '0' + j.toString();

        this.minutesList.push(newValue);
      } else {
        this.minutesList.push(j.toString());
      }
    }
  }

  onItemClicked(item: string) {
    this.listsService.setMinutesData(item);
    console.log(item);
  }
}

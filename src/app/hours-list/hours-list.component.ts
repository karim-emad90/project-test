import { Component,  OnInit} from '@angular/core';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-hours-list',
  templateUrl: './hours-list.component.html',
  styleUrl: './hours-list.component.css',
})
export class HoursListComponent implements OnInit {
  constructor(private listsSevice: ListsService) {}
  hoursList: Array<any> = [];

  ngOnInit() {
    for (let i = 1; i < 13; i++) {
      if (i.toString().length === 1) {
        let newValue = '0' + i.toString();
        this.hoursList.push(newValue);
      } else {
        this.hoursList.push(i.toString());
      }
    }
  }

  onItemClicked(item: string) {
    this.listsSevice.setHoursData(item);
  }
}

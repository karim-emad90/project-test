import { ListsService } from './../lists.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MinutesListComponent } from '../minutes-list/minutes-list.component';
import { HoursListComponent } from '../hours-list/hours-list.component';
import { TimeListComponent } from '../time-list/time-list.component';
import moment from 'moment';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrl: './date-time.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateTimeComponent,
    },
  ],
})
export class DateTimeComponent implements OnInit, ControlValueAccessor {
  private refOverlay!: OverlayRef;

  @ViewChild('hoursInput') hoursInput!: HTMLInputElement;
  @ViewChild('minutesInput') minutesInput!: HTMLInputElement;
  @ViewChild('timeInput') timeInput!: HTMLInputElement;
  @ViewChild(HoursListComponent)
  hoursComponent!: any;

  choosenHour: string = 'hours';
  choosenMinute: string = 'minutes';
  choosenTime: string = 'am/pm';
  fullTimeData: string = '';

  constructor(private overLay: Overlay, private listsService: ListsService) {
    this.listsService.data$.subscribe((data) => {
      this.choosenHour = data;
      this.onInputValueChanged();
      this.refOverlay.detach();
    });

    this.listsService.minute$.subscribe((data) => {
      this.choosenMinute = data;
      this.onInputValueChanged();
      this.refOverlay.detach();
    });

    this.listsService.time$.subscribe((data) => {
      this.choosenTime = data;
      this.onInputValueChanged();
      this.refOverlay.detach();
    });
  }

  ngOnInit() {}

  popupComponent(portalComponent: any) {
    const popupComponent = new ComponentPortal(portalComponent);
    this.refOverlay.attach(popupComponent);
    this.refOverlay.backdropClick().subscribe(() => {
      this.refOverlay.detach();
      this.refOverlay = null!;
    });
  }

  createOverlayRef(elementRef: HTMLInputElement) {
    this.refOverlay = this.overLay.create({
      positionStrategy: this.overLay
        .position()
        .flexibleConnectedTo(elementRef)

        .withPositions([
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'center',
          },
        ]),
      hasBackdrop: true,
    });
  }

  onInputClicked(element: HTMLInputElement) {
    if (element.name === 'hoursData') {
      this.createOverlayRef(this.hoursInput);
      this.popupComponent(HoursListComponent);
    }

    if (element.name === 'minutes') {
      this.createOverlayRef(this.minutesInput);
      this.popupComponent(MinutesListComponent);
    }
    if (element.name === 'time') {
      this.createOverlayRef(this.timeInput);
      this.popupComponent(TimeListComponent);
    }
  }

  onInputValueChanged() {
    if (
      this.choosenHour === 'hours' &&
      this.choosenMinute === 'minutes' &&
      this.choosenTime === 'am/pm'
    ) {
      this.onChange(' ');
    }
    if (
      this.choosenHour !== 'hours' &&
      this.choosenMinute !== 'minutes' &&
      this.choosenTime !== 'am/pm'
    ) {
      this.fullTimeData =
        this.choosenHour + ':' + this.choosenMinute + ':' + this.choosenTime;

      const date = new Date();
      const fullDate =
        moment(this.fullTimeData, 'hh:mm A').format('hh:mm a') +
        ' ' +
        moment(date).format('MM/DD/YYYY');
      this.onChange(fullDate);
    }
  }

  //contol value accessor methods
  onChange: any;
  onTouched: any;
  writeValue(value: string) {}
  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: (value: string) => void) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}
}

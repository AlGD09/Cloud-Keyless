import { RentedWallbox } from './../../model/wallbox';
import { ChargingService } from './../../services/charging.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Wallbox } from '../../model/wallbox';
import { Booking, UpcomingBooking } from '../../model/booking';
import { addMinutes, format } from 'date-fns';
import { RentedWallboxService } from '../../services/rentedWallbox.service';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { TimeRangeComponent } from '../time-range/time-range.component';
import { SpinnerWithTextComponent } from '../spinner-with-text/spinner-with-text.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-charging',
  standalone: true,
  templateUrl: './charging.component.html',
  styleUrls: ['./charging.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    TimeRangeComponent,
    SpinnerWithTextComponent,
    MatButtonModule
  ]
})
export class ChargingComponent implements OnInit {

  clickCount = 0;
  USER = "Elekey";
  wallboxes: Wallbox[] = [];
  selectedWallbox!: Wallbox;
  upcomingBooking: UpcomingBooking | null = null;
  currentTime: Date = new Date();
  isTurnedOn = false;
  isCharging = false;
  spinnerState: 'off' | 'on' | 'charging' = 'off';

  constructor(
    private chargingService: ChargingService,
    private bookingService: BookingService,
    private rentedWallboxService: RentedWallboxService
  ) {}

  ngOnInit() {
    this.loadWallboxes();
    this.fetchUpcomingBooking();
  }

loadWallboxes() {
  this.rentedWallboxService.findAll().subscribe(wallboxes => {
    this.wallboxes = wallboxes;
    this.selectedWallbox = wallboxes[0]; // Default selection
    this.fetchUpcomingBooking(); // Now safe to call
  });
}

  fetchUpcomingBooking() {
    this.bookingService.getUpcomingBooking(this.USER, this.selectedWallbox.id).subscribe(booking => {
      this.upcomingBooking = booking;
    });
  }

  get isAfterBookingStart(): boolean {
  if (!this.upcomingBooking) return false;
  const now = new Date();
  const start = new Date(this.upcomingBooking.startTime);
  return now >= start;
}

  isBeforeUpcomingBookingEndTime(): boolean {
    const now = new Date();
    if(this.upcomingBooking) {
      return now < new Date(this.upcomingBooking.endTime)
    }
    return false;
  }

  handleTurnOnClick() {
    this.clickCount++;
    if (this.clickCount % 2 === 0) {
      this.onEvenClick();
    } else {
      this.onOddClick();
    }
    this.isTurnedOn = !this.isTurnedOn;

  }

  onEvenClick() {
    this.chargingService.turnOff();
    this.spinnerState="off";
  }

  onOddClick() {
    this.chargingService.turnOn();
    this.spinnerState="on";
  }

  onWallboxChange() {
  this.fetchUpcomingBooking();
}

//   get isBookingActive(): boolean {
//   if (!this.upcomingBooking) return false;
//   const now = new Date();
//   const start = new Date(this.upcomingBooking.startTime);
//   const end = new Date(this.upcomingBooking.endTime);
//   return now >= start && now <= end;
// }

toggleCharging() {
  if (this.isCharging) {
    if (this.upcomingBooking) {
      console.log(this.upcomingBooking)
      this.chargingService.remoteStop(this.upcomingBooking.booking);
      this.spinnerState="on";
    }
  } else {
    this.chargingService.remoteStart();
    this.spinnerState="charging";
  }
  this.isCharging = !this.isCharging;
}

get upcomingBookingEndPlusOneMinute(): Date | null {
  if (!this.upcomingBooking?.endTime) return null;
  return addMinutes(this.upcomingBooking.endTime, 1);
}

get powerButtonText(): string {
  return this.isTurnedOn ? $localize`Deactivate chargepoint` : $localize`Activate chargepoint`
}

get chargingButtonText(): string {
  return this.isCharging ? $localize`Stop charging` : $localize`Start charging`
}

}

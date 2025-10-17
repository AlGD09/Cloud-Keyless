import { BookingService } from '../../services/booking.service';
import { TransactionsDialogComponent } from '../transactions-dialog/transactions-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UpcomingBooking } from '../../model/booking';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../model/invoice';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-upcoming-bookings',
    standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  invoices: Invoice[] = [];
  isLoading = true;
  USER = "Elekey";

  constructor(private http: HttpClient, private dialog: MatDialog, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getInvoices(this.USER)
      .subscribe({
        next: invoices => {
          this.invoices = invoices;
          console.log(invoices);
          this.isLoading = false;
        },
        error: () => {
          this.invoices = [];
          this.isLoading = false;
        }
      });
  }

  openDialog(booking: UpcomingBooking): void {
    this.dialog.open(TransactionsDialogComponent, {
      data: booking,
      width: '800px'
    });
  }

  addOneMinute(date: Date): Date {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + 1);
  return newDate;
}

}

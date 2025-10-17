import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Invoice } from '../../model/invoice';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-invoice-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule
  ],
  templateUrl: './transactions-dialog.component.html',
  styleUrls: ['./transactions-dialog.component.scss']
})
export class TransactionsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Invoice) {}

  timeSlotColumns: string[] = ['startTime', 'endTime', 'bookingTime', 'pings'];
  transactionColumns: string[] = ['startTime', 'endTime', 'wh'];
}

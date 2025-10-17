import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { ChargingComponent } from './components/charging/charging.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

export const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: 'book', component: BookingComponent },
  { path: 'charge', component: ChargingComponent },
  { path: 'transactions', component: TransactionsComponent },
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
export class AppRoutingModule { }

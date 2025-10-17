import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsDialogComponent } from './transactions-dialog.component';

describe('InvoiceDialogComponent', () => {
  let component: TransactionsDialogComponent;
  let fixture: ComponentFixture<TransactionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

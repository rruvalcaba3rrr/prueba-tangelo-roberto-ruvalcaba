import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Loan } from 'src/app/models/loan';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public capitalAmount = environment.backCapital;
  private loanSuscription: Subscription;
  public dataSource: any;
  public displayedColumns: string[] = [
    'id',
    'name',
    'amount',
    'status',
    'date',
    'action',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginatorIntl;

  public pendingToPay: number = 0;
  public totalLoans: number = 0;

  constructor(private firestore: AngularFirestore) {
    this.loanSuscription = this.firestore
      .collection('loans')
      .valueChanges()
      .subscribe((data) => {
        this.pendingToPay = data.filter((e:any) => e.status == 1).length;
        this.totalLoans = data.length;
        let pendingLoan = data.filter((e:any) => e.status == 1);
        pendingLoan.forEach((element:any) => {
            this.capitalAmount -= element.amount;
        });
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  ngOnDestroy(): void {
    this.loanSuscription.unsubscribe();
  }

  ngOnInit(): void {}

  payLoan(loan:Loan){

  }
}

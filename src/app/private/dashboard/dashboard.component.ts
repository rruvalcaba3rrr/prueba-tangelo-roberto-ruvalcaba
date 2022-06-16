import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Loan } from 'src/app/models/loan';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
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
  public loading:boolean = true;

  constructor(private firestore: AngularFirestore) {
    var loans$ = this.firestore
      .collection('loans')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const data = action.payload.doc.data() as any;
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        })
      );

    this.loanSuscription = loans$.subscribe((data: any) => {
      this.pendingToPay = data.filter((e: any) => e.status == 1).length;
      this.totalLoans = data.length;
      let pendingLoan = data.filter((e: any) => e.status == 1);
      if (pendingLoan.length > 0) {
        var totalPendingAmount = 0;
        pendingLoan.forEach((element: any) => {
          totalPendingAmount += element.amount;
        });
        this.capitalAmount =  environment.backCapital - totalPendingAmount;
      }else{
        this.capitalAmount =  environment.backCapital;
      }
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }
  ngOnDestroy(): void {
    this.loanSuscription.unsubscribe();
  }

  ngOnInit(): void {}

  payLoan(loan: Loan) {
    Swal.fire({
      title: '¿Seguro que desea pagar este prestamo?',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.firestore.collection('loans').doc(loan.id).update({status: 2})
        Swal.fire('Hecho!', 'Prestamo pagado correctamente', 'success');
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnInit {

  public amountSelected: number = 3500;
  options: Options = {
    floor: 1000,
    ceil: 5000
  };
  constructor() { }

  ngOnInit(): void {
  }

  requestLoan(){
    console.log(this.amountSelected);
    
  }
}

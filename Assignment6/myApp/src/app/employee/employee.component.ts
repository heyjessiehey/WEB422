import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/EmployeeRaw';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  paramSubscription: any;
  employeeSubscription: any;
  getPositionSubscription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[];
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private e: EmployeeService, private a: ActivatedRoute, 
    private p: PositionService) { }

  ngOnInit() {
    this.paramSubscription = this.a.params.subscribe((data) => {
      this.employeeSubscription = this.e.getEmployee(data['_id']).subscribe((emp) =>{
        this.employee = emp[0];

        this.getPositionSubscription = this.p.getPositions().subscribe((data) =>{
          this.positions = data;
        })
      })
    })
  }

    onSubmit(f: NgForm){
      this.saveEmployeeSubscription = this.e.saveEmployee(this.employee).subscribe(() =>{
        this.successMessage = true;
        setTimeout(()=>{
          this.successMessage = false;
        }, 2500);
      }, () => {
        this.failMessage = true;
        setTimeout(() =>{
          this.failMessage = false;
        }, 2500);
      })
  }

  ngOnDestroy(){
    if(this.paramSubscription){this.paramSubscription.unsubscribe();}
    if(this.employeeSubscription){this.employeeSubscription.unsubscribe();}
    if(this.getPositionSubscription){this.getPositionSubscription.unsubscribe();}
    if(this.saveEmployeeSubscription){this.saveEmployeeSubscription.unsubscribe();}
  }
}

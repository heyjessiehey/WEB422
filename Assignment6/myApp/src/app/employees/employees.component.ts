import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee'
import { EmployeeService } from '../data/employee.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  getEmployeesSub: any;
  loadingError: boolean = false;

  constructor(private e: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmployeesSub = this.e.getEmployees().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data;
    }, (err) => {
      this.loadingError = true;
    })
  }
  ngOnDestroy() {
    if (this.getEmployeesSub)
      this.getEmployeesSub.unsubscribe();
  }
  
  routeEmployee(id: string){
    this.router.navigate(['/employee', id]);
  }

  onEmployeeSearchKeyUP(event:any) {
    this.filteredEmployees = this.employees.filter((employee) => {
      return employee.FirstName.toLowerCase().includes(event.target.value) 
      || employee.LastName.toLowerCase().includes(event.target.value)
      || employee.Position.PositionName.toLowerCase().includes(event.target.value);
    });
  }
}

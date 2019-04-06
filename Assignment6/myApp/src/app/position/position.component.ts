import { Component, OnInit } from '@angular/core';
import { Position } from '../data/position'
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position;
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private a: ActivatedRoute, private p: PositionService) { }

  ngOnInit() {
    this.paramSubscription = this.a.params.subscribe((data) => {
      this.positionSubscription = this.p.getPosition(data['_id']).subscribe((pos) => {
        this.position = pos[0];
      })
    })
  }

  onSubmit(f: NgForm){
    this.savePositionSubscription = this.p.savePosition(this.position).subscribe(()=>{
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
    if(this.positionSubscription){this.positionSubscription.unsubscribe();}
    if(this.savePositionSubscription){this.savePositionSubscription.unsubscribe();}
  }
}

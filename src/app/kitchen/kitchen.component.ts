import { Component, OnInit } from '@angular/core';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  create(){
  	alert("Clicked");
  }

}

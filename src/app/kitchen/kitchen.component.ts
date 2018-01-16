import { Component, OnInit } from '@angular/core';
import { CreateComponent } from '../create/create.component';
import { DalvirooService } from '../dalviroo.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

	orders;
	constructor(private dalviroo: DalvirooService) {

	}

	ngOnInit() {
		this.dalviroo.getOrders().subscribe( data => {
			this.orders = data;
			if(!this.orders){
				alert("Seems like you don't have any orders. Start by creating one now");
			}
		});
	}

}

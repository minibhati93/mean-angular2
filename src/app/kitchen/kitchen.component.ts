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
			else{
			}
		});
	}

	updateCreated(id){
		let that = this;
		this.orders.forEach(function(order) { 
			if(order._id == id) {
				order.created+=1;
				that.dalviroo.updateOrder(id, {created: order.created}).subscribe(data => {
					console.log("Order is Ready");
				});
			}
		});

	}

	download(){
		this.dalviroo.getCSV().subscribe(data => {
			console.log(data);
		});

	}

}

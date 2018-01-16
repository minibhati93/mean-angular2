import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CreateComponent } from '../create/create.component';
import { DalvirooService } from '../dalviroo.service';
import 'rxjs/Rx' ;

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

	orders;

	@ViewChild('export') el:ElementRef;
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
			var blob = new Blob([data], { type: 'text/csv' });
			var url= window.URL.createObjectURL(blob);
			this.el.nativeElement.download = "report.csv";
			this.el.nativeElement.href = url;
			this.el.nativeElement.click();
		});

	}

}

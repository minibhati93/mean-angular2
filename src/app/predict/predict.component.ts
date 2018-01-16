import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DalvirooService } from '../dalviroo.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit {

	model:any = {};
	message:string;
	closed = false;
	orders;

	constructor(private location: Location,
				private router: Router, 
				private dalviroo: DalvirooService) {

		this.model={name: '', predicted: 0, id: ''};
	}

	ngOnInit() {
		this.dalviroo.getOrders().subscribe( data => {
			this.orders = data;
		});
	}

	goBack(): void {
		this.location.back();
	}

	onSubmit(){
		console.log(JSON.stringify(this.model));
		this.dalviroo.updateOrder(this.model.id, {predicted: this.model.predicted}).subscribe(data => {
			console.log("Predicted value set");
			this.router.navigate(["/kitchen"]);
		});
	}

	onChange(newValue) {
		// console.log(newValue);
		this.model.id = newValue;
	}

}

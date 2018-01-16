import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DalvirooService } from '../dalviroo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
	model = {};
	message:string;
	closed = false;

	constructor(private location: Location,
				private router: Router, 
				private dalviroo: DalvirooService) {

		this.model = { name: '', quantity: 1, created:0, predicted: 0 };
	}

	ngOnInit() {
	}

	goBack(): void {
		this.location.back();
	}

	onSubmit(){
		// console.log(this.model);
		this.dalviroo.createOrder(this.model).subscribe(data =>{
			console.log("Order successfully placed");
			this.message = "Order successfully placed";
			this.router.navigate(["/kitchen"]);
		});
	}

}
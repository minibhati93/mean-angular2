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
	model = {}

	constructor(private location: Location,
				private router: Router, 
				private dalviroo: DalvirooService) {

		this.model = {name:'', quantity: 0};
	}

	ngOnInit() {
	}

	goBack(): void {
		this.location.back();
	}

	onSubmit(){
		this.dalviroo.saveOrder('Vegetable').subscribe(data =>{
			console.log(data);
		},
		err => console.log(err));
		//this.router.navigate(['/kitchen']);
	}

}

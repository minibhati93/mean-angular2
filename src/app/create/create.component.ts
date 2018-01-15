import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})


export class CreateComponent implements OnInit {
	model = {}

	constructor(private location: Location,private router: Router) {
		this.model = {name:'', quantity: 0};
	}

	ngOnInit() {
	}

	goBack(): void {
		this.location.back();
	}

	onSubmit(){
		this.router.navigate(['/kitchen']);
	}

}

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

	model = {};
	message:string;
	closed = false;
	dishes={};

	constructor(private location: Location,
				private router: Router, 
				private dalviroo: DalvirooService) {

	}

	ngOnInit() {
		this.model={dish: 'A', prediction:1};
	}

	goBack(): void {
		this.location.back();
	}

	typeChanged(){
	}

}

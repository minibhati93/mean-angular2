import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DalvirooService {

  	constructor(private http: Http) {

  	}

  	createOrder(data){
  		  let bodyString = JSON.stringify(data); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post('/api/create', data, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch(this.handleError); //...errors if any
  	}

    getOrders(){
        return this.http.get('/api/orders')
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    handleError(error) {
        console.log(JSON.stringify(error));
        return Observable.throw('Server error');
    }

    updateOrder(body){
        // let bodyString = JSON.stringify(body); // Stringify payload
        // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        // let options       = new RequestOptions({ headers: headers }); // Create a request option

        // return this.http.put(`${this.commentsUrl}/${body['id']}`, body, options) // ...using put request
        //                  .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        //                  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   


}

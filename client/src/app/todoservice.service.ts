/* # ********************************************************************** #
   #    Copyright (C) by <Habilelabs>, <2018>								#
   #    www.habilelabs.io													#
   # ********************************************************************** # */


/* ##########################################################################
   #	Purpose: <Service file having API calls>							#
   #	SN  Date  			Change Description      		Modified By		#
   #	1   27/09/2018    		Base Version                Ronak Jain		#
   ##########################################################################  */


import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Todo} from './models/Todo';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
	})
export class TodoserviceService {

	constructor(private http: Http) {
	}


	// API calls........................................


	// 1. Get All The Items
	public getAllItems(): Observable<Todo[]> {
		const URI = 'http://localhost:7200/api/v1/post';
		return this.http.get(URI)
			.pipe(map(res => res.json()));
	}


	// 2. Add The Item
	public addTodo(todo: Todo) {
		const URI = 'http://localhost:7200/api/v1/post';
		const headers = new Headers;
		const body = JSON.stringify({item: todo.item, completed: todo.completed});
		headers.append('Content-Type', 'application/json');
		return this.http.post(URI, body, {headers: headers})
			.pipe(map(res => res.json()));

	}


	// 3. Delete A particular Item
	public deleteItem(id: string) {
		const URI = `http://localhost:7200/api/v1/post/${id}`;
		const headers = new Headers;
		headers.append('Content-Type', 'application/json');
		return this.http.delete(URI, {headers}).pipe(map(res => res.json()));
	}


	// 4. Delete The Completed Item
	public deleteComplete() {
		const URI = 'http://localhost:7200/api/v1/posts';
		return this.http.delete(URI).pipe(map(res => res.json()));
	}


	// 5. Update the item Whether its completd or not
	public updateItem(todo: Todo) {
		const URI = `http://localhost:7200/api/v1/post/${todo._id}`;
		const headers = new Headers;
		const body = JSON.stringify({completed: todo.completed});
		headers.append('Content-Type', 'application/json');
		return this.http.put(URI, body, {headers: headers}).pipe(map(res => res.json()));
	}


	// 6. Getting the Item which are Not Completed
	public getActive() {
		const URI = 'http://localhost:7200/api/v1/post/active';
		return this.http.get(URI)
			.pipe(map(res => res.json()));
	}


	// 7. Getting the item which are Completed
	public getCompleted() {
		const URI = 'http://localhost:7200/api/v1/post/complete';
		return this.http.get(URI)
			.pipe(map(res => res.json()));
	}
}

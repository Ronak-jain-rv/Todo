/* # ********************************************************************** #
   #    Copyright (C) by <Habilelabs>, <2018>								#
   #    www.habilelabs.io													#
   # ********************************************************************** # */


/* ##########################################################################
   #	Purpose: <Body Typescript file>										#
   #	SN  Date  			Change Description      		Modified By		#
   #	1   27/09/2018    		Base Version                Ronak Jain		#
   ##########################################################################  */



import {Component, OnInit} from '@angular/core';
import {TodoserviceService} from '../todoservice.service';
import {Todo} from '../models/Todo';


@Component({
	selector: 'app-body',
	templateUrl: './body.component.html',
	styleUrls: ['./body.component.css']
	})


export class BodyComponent implements OnInit {

	todo: Todo[] = [];
	newTodo: Todo;

	inputText: string;
	counter = 0;
	selectedAll;
	all = true;
	active = false;
	completed = false;

	activeTodo: Todo[] = [];
	completeTodo: Todo[] = [];


	constructor(private _todoservice: TodoserviceService) {
	}


	// Load Items on reload
	ngOnInit() {
		this.loadItems();

		this.newTodo = {
			item: '',
			completed: false
		};

	}


	// Setting the counter
	select() {
		this.counter = 0;
		/*for (let i = (this.todo.length - 1); i > -1; i--) {
			this.counter += this.todo[i].completed ? 0 : 1;

		}*/

		this.todo.map((elem) => {
			this.counter += elem.completed ? 0 : 1;
		});

	}


	// Load the item which are present in Backend
	public loadItems() {
		this._todoservice.getAllItems().subscribe(res => {
			this.todo = res;
			this.select();
		});
	}


	// Add the Item in Backend
	public addItem() {
		if (this.inputText == null || this.inputText.trim() === '') {
			return;
		}
		this.newTodo.item = this.inputText;

		this._todoservice.addTodo(this.newTodo).subscribe(res => {
			this.todo = res;

			if(this.active === true) {
				this.getActive();
			}

			this.select();
		});

		this.inputText = '';
	}


	// Delete the particular Item
	public deleteItem(id: string) {
		this._todoservice.deleteItem(id).subscribe(res => {
			this.todo = res;
			this.select();
		});
	}


	// Delete from Active
	deleteActive(id: string) {
		this._todoservice.deleteItem(id).subscribe(res => {
			this.todo = res;
			this.getActive();
			this.select();
		});


	}


	// Delete fro completed
	deleteCompleted(id: string) {
		this._todoservice.deleteItem(id).subscribe(res => {
			this.todo = res;
			this.getCompleted();
			this.select();
		});

	}


	// To select each and every item
	selectAll() {
		/*for (let i = 0; i < this.todo.length; i++) {
          this.todo[i].completed = this.selectedAll;
          this.updateItem(this.todo[i]);
          this.select();
        }*/
		this.todo.map((elem) => {
			elem.completed = this.selectedAll;
			this.updateItem(elem);
			this.select();
		});
	}


	// To select each and every item from active
	selectActive() {
		/*for (let i = 0; i < this.todo.length; i++) {
          this.todo[i].completed = this.selectedAll;
          this.updateActive(this.todo[i]);
          this.select();
        }*/

		this.todo.map((elem) => {
			elem.completed = this.selectedAll;
			this.updateActive(elem);
			this.select();
		});
	}


	// To select each and every item from completd
	selectCompleted() {
		/*for (let i = 0; i < this.todo.length; i++) {
			this.todo[i].completed = this.selectedAll;
			this.updateCompleted(this.todo[i]);
			this.select();
		}*/

		this.todo.map((elem) => {
			elem.completed = this.selectedAll;
			this.updateCompleted(elem);
			this.select();
		});
	}


	// update completion of the item
	updateItem(todo: Todo) {
		this._todoservice.updateItem(todo).subscribe(res => {
			this.todo = res;
			this.select();
		});


	}


	// Update when a item in unchecked
	updateActive(todo: Todo) {
		this._todoservice.updateItem(todo).subscribe(res => {
			this.todo = res;
			this.select();
		});
		this.getActive();
	}


	// Update when item is checked
	updateCompleted(todo: Todo) {
		this._todoservice.updateItem(todo).subscribe(res => {
			this.todo = res;
			this.select();
		});
		this.getCompleted();
	}


	// Clear all completed items
	clearCompleted() {
		this._todoservice.deleteComplete().subscribe(res => this.todo = res);

		if (this.completed === true) {
			this.getCompleted();
		}

	}


	// to show all div
	getAll() {
		this.all = true;
		this.active = false;
		this.completed = false;
	}


	// to show active div
	getActive() {
		this.all = false;
		this.active = true;
		this.completed = false;
		this._todoservice.getActive().subscribe(res => this.activeTodo = res);
	}


	// to show completed div
	getCompleted() {
		this.all = false;
		this.active = false;
		this.completed = true;

		this._todoservice.getCompleted().subscribe(res => this.completeTodo = res);
	}


}

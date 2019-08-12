import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Todo} from '../todo';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  inputControl = new FormControl();
  todoList: Todo[] = [];

  constructor(private todoServive: TodoService) { }

  ngOnInit() {
    this.todoServive.getTodos().subscribe(next => {
      this.todoList = next;
    }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      }
    );
  }

  addTodo() {
    const todo: Partial<Todo> = {
      tile: this.inputControl.value,
      completed: false
    };
    this.todoServive.createTodo(todo).subscribe(next => {
      this.todoList.unshift(next);
      this.inputControl.setValue('');
    });
  }

  toggleTodo(i: number) {
    const todo = this.todoList[i];
    const todoData = {
      ...todo,
      completed: !todo.completed
    };
    this.todoServive.updateTodo(todo).subscribe(next => {
      this.todoList[i].completed = next.completed;
    });
  }

  deleteTodo(i: number) {
    const todo = this.todoList[i];
    this.todoServive.deleteTodo(todo.id).subscribe(() => {
      this.todoList = this.todoList.filter(t => t.id !== todo.id);
    });
  }
}

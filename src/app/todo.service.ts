import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Todo} from './todo';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly API_URL = 'http://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }

  getTodos(count = 10): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL).pipe(
      map(response => response.filter((todo, i) => i < count))
    );
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.API_URL}/${id}`);
  }

  createTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.API_URL, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`${this.API_URL}/${todo.id}`, todo);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { Student } from '../model/student';
import { catchError, retry} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  //Students Endpoint
  basePath = 'http://localhost:3000/api/v1/students';

httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

  constructor(private http: HttpClient) { }

  //API Error Handling
  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      //Default error handling
      console.log(`An error ocurred: ${error.error.message}`);
    }else{
      //Unsuccessful response Error Code returned from Backend
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    //Return Observable with Error Message to Client
    return throwError('Something happend with request, please try again later');
  }

  //Create Student
  create(item: any): Observable<Student>{
    return this.http.post<Student>(this.basePath, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  //Get Student By Id
  getById(id:any): Obervable<Student>{
    return this.http.get<Student>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  //Get All Students
  getAll(): Obervable<Student>{
    return this.http.get<Student>(this.basePath, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  //Update Student
  update(id:any, item:any): Obervable<Student>{
    return this.http.put<Student>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }

  //Delete Student
  delete(id:any){
    return this.http.delete<Student>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
}

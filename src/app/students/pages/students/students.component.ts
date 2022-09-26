import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../model/student';
import { StudentsService } from '../../services/students.service';
import * as _ from 'lodash';//conjunto de bibliotecas que nos permiten tener acceso a varias funciones utilitarias

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit {

  studentData: Student;
  //El MatTableDataSource es un objeto que llena de datos a una tabla
  dataSource: MatTableDataSource<any>;
  isEditMode: boolean = false;
  displayedColumns: string[]=['id','name','age','address','actions'];

  //¿Para qué es el ViewChild y que significa el ! en este contexto?
  @ViewChild('studentForm', {static: false})
  //el simbolo ! es para no tener que declararlo en el constructor
  //xq no lleva punto y coma al final
  studentForm!: NgForm //esto está amarrado al formulario en el html

  @ViewChild(MatPaginator,{static:true})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private studentsService: StudentsService) { 
    //¿Que significa {} as Student?
    this.studentData={} as Student; //Objeto vacío de tipo estudiante
    this.dataSource = new MatTableDataSource<any>();
    //Vamos crear un objeto cuya función sea rellenar los datos de una tabla
  }

  getAllStudents(){
    this.studentsService.getAll().subscribe((response: any)=>{
      this.dataSource.data = response;
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllStudents();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  editItem(element: Student){
    this.studentData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit(){
    this.isEditMode=false;
    this.studentForm.resetForm();
  }

  deleteItem(id:number){
    this.studentsService.delete(id).subscribe(()=>{
      this.dataSource.data = this.dataSource.data.filter((o: Student)=>{
        return o.id !== id? o:false;
      });
    });
    console.log(this.dataSource.data);
  }

  addStudent(){
    this.studentData.id=0;
    this.studentsService.create(this.studentData).subscribe((response:any)=>{
      this.dataSource.data.push({...response});//¿que significa ...response?
      this.dataSource.data = this.dataSource.data.map((o:any)=>{return o;});
    });
  }


  updateStudent(){// ¿Como funciona esta funcion?
    this.studentsService.update(this.studentData.id, this.studentData).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.map((o: Student)=>{
        if(o.id === response.id){
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit(){
    if(this.studentForm.form.valid){
      console.log('valid');
      if(this.isEditMode){
        console.log('about to update');
        this.updateStudent();
      }else{
        console.log('about to add');
        this.addStudent();
      }
      this.cancelEdit();
    }else{
      console.log('Invalid data');
    }
  }
}

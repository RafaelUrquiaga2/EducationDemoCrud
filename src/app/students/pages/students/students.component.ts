import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../model/student';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  studentData: Student;
  dataSource: MatTableDataSource<any>;
  isEditMode: boolean = false;

  @ViewChild('studentForm', {static: false})
  studentForm!: NgForm

  constructor(private studentsService: StudentsService) { 
    this.studentData={} as Student;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
  }

  cancelEdit(){
    this.isEditMode=false;
    this.studentForm.resetForm();
  }

  onSubmit(){
    if(this.studentForm.form.valid){
      console.log('valid');
      if(this.isEditMode){
        console.log('about to update');
        //this.updateStudent();
      }else{
        console.log('about to add');
        //this.addStudent();
      }
      //this.cancelEdit();
    }else{
      console.log('Invalid data');
    }
  }
}

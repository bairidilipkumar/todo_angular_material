import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms'
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoform!:FormGroup;
  tasks:ITask []=[];
  inprogress:ITask[]=[];
  done:ITask[]=[];
  updateId: any;
  isedienable: boolean=false;

  constructor(private todobuilder:FormBuilder ) { }

  ngOnInit(): void {
    this.todoform=this.todobuilder.group({
      itm:['',Validators.required]
    })
  }

  addtask(){
    this.tasks.push({
      description:this.todoform.value.itm,
      done:false
    })
    this.todoform.reset();
  }

  deletetask(id:number){
    this.tasks.splice(id,1)

  }

  deletetaskinprogress(id:number){
    this.inprogress.splice(id,1)

  }
  onedit(item:ITask,id:number){
    this.todoform.controls['itm'].setValue(item.description);
    this.updateId=id;
    this.isedienable=true;
  }
  updatetask(){
    this.tasks[this.updateId].description=this.todoform.value.itm;
    this.tasks[this.updateId].done=false;
    this.todoform.reset();
    this.updateId=undefined;
    this.isedienable=false;
  }
  deleteafterdone(id:number){
    this.done.splice(id,1)
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}

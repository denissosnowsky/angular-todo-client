import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TodoListComponent } from './todo-list/todo-list.component'
import { RowComponent } from './todo-list/components/row/row.component'
import { MaterialModule } from '../material/material.module'
import { FormComponent } from './todo-list/components/form/form.component'
import { FormsModule } from '@angular/forms';
import { FocusDirective } from './todo-list/directives/focus.directive';
import { TransformCasePipe } from './todo-list/pipes/transform-case.pipe'

@NgModule({
  declarations: [TodoListComponent, RowComponent, FormComponent, FocusDirective, TransformCasePipe],
  imports: [CommonModule, MaterialModule, FormsModule]
})
export class TodoListModule {}

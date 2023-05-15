import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SignUpComponent } from './auth/components/sign-up/sign-up.component'
import { TodoListComponent } from './todo-list/todo-list/todo-list.component'

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

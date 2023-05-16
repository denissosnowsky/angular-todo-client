import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SignUpComponent } from './auth/components/sign-up/sign-up.component'
import { TodoListComponent } from './todo-list/todo-list/todo-list.component'
import { ActivationComponent } from './auth/components/activation/activation.component'
import { SignInComponent } from './auth/components/sign-in/sign-in.component'

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'activate',
    component: ActivationComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

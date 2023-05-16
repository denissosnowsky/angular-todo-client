import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { MaterialModule } from '../material/material.module';
import { ActivationComponent } from './components/activation/activation.component';
import { SignInComponent } from './components/sign-in/sign-in.component'

@NgModule({
  declarations: [SignUpComponent, ActivationComponent, SignInComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class AuthModule {}

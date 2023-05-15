import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { MaterialModule } from '../material/material.module'

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class AuthModule {}

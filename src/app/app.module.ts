import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from './auth/auth.module'
import { ErrorModule } from './error/error.module'
import { TodoListModule } from './todo-list/todo-list.module'
import { MaterialModule } from './material/material.module'
import { LoadingComponent } from './common/loading/loading.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ErrorModule,
    TodoListModule,
    MaterialModule,
    LoadingComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

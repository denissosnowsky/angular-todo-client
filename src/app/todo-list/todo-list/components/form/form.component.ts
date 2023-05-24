import { Component, EventEmitter, Output } from '@angular/core'

export type AddTodoEvent = {
  value: string
  resetValue: Function
}

@Component({
  selector: '[app-form]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() addTodoEvent = new EventEmitter<AddTodoEvent>()
  value: string = ''

  addTodo () {
    this.addTodoEvent.emit({
      value: this.value,
      resetValue: this.resetValue.bind(this)
    })
  }

  resetValue () {
    this.value = ''
  }
}

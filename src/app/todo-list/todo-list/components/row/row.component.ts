import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: '[app-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent {
  @Input() completed: boolean = false
  @Input() text: string = ''
  @Output() deleteEvent = new EventEmitter<void>()
  @Output() checkEvent = new EventEmitter<boolean>()

  delete () {
    this.deleteEvent.emit()
  }

  check (value: boolean) {
    this.checkEvent.emit(value)
  }
}

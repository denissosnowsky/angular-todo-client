import { Pipe, PipeTransform } from '@angular/core'
import { TodoDTO } from 'src/app/models/Todo'

@Pipe({
  name: 'transformCase'
})
export class TransformCasePipe implements PipeTransform {
  transform (
    values: Array<TodoDTO> | null,
    mode: 'firstUpper' | 'lower' | 'upper'
  ): Array<TodoDTO> {
    const transformTodoArray = (
      transformFn: (title: string) => string
    ): Array<TodoDTO> => {
      return (
        values?.map(value => ({
          ...value,
          title: transformFn(value.title)
        })) ?? []
      )
    }

    switch (mode) {
      case 'firstUpper':
        return transformTodoArray(
          value => value.charAt(0).toUpperCase() + value.slice(1)
        )
      case 'lower':
        return transformTodoArray(value => value.toLowerCase())
      case 'upper':
        return transformTodoArray(value => value.toUpperCase())
      default:
        return []
    }
  }
}

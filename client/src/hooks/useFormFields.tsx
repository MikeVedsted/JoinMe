import { useState } from 'react'

export function useFormFields(initialState: any) {
  const [fields, setValues] = useState(initialState)

  return [
    fields,
    function (event: any) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value,
      })
    },
    function (id: string, values: string[]) {
      if (fields[id].includes(values)) {
        const index = fields[id].indexOf(values)
        fields[id].splice(index, 1)
      } else {
        fields[id].push(values)
      }
    },
  ]
}

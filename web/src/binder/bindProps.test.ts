import { test, expect } from 'bun:test'
import { bindProps } from './bindProps'
import { params, scenarioOf } from './shared.test'

const props = { data:{ hello:'world' }, bind:'hello' }

test('bindProps: none', function() {
   globalThis.IS_SERVER_SIDE_TEST = true
   const outputProps = bindProps({}, params)
   expect(outputProps).toEqual({})
})

const scenarios: any[] = [
   scenarioOf(props, 'input'),
   scenarioOf(props, 'input', 'text'),
   scenarioOf(props, 'input', 'text', ['value', 'onChange']),
   scenarioOf(props, 'input', 'radio', ['checked', 'onChange']),
   scenarioOf(props, 'input', 'button', ['checked', 'onClick']),
   scenarioOf(props, 'input', 'checkbox', ['checked', 'onChange']),
   scenarioOf(props, 'select', '', ['value', 'onSelect']),
   scenarioOf(props, 'textarea', '', ['value', 'onChange'])
]

scenarios.forEach(function(scenario){   
   const [props, params, value, keys] = scenario
   const type = props.type ? `[${props.type}]` : ''
   const description = `${params.tag}${type}`

   test(`bindProps: ${description}`, function() {
      globalThis.IS_SERVER_SIDE_TEST = true

      const result = bindProps(props, params) 
      const fields = Object.keys(result)
      const intern = result[keys[0]]
      const valued = intern ? 'world' : undefined

      keys.map(k => expect(fields).toContain(k))
      expect(valued).toBe(intern)
   })
})
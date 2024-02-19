import { test, expect } from 'bun:test'
import { Path } from '../../core/src/utils/path'

const scenarios = [
   ['url', '/routes', '/'],
   ['sub url', '/routes/sub', '/sub'],
   ['http', 'http://domain.com/routes', '/'],
   ['https', 'https://domain.com/routes', '/'],
   ['https port', 'https://domain.com:3000/routes', '/'],
   ['https port file', 'https://domain.com:3000/routes/file.tsx', '/file'],
   ['https port index', 'https://domain.com:3000/routes/index', '/'],
   ['https port sub file', 'https://domain.com:3000/routes/sub/file.tsx', '/sub/file'],
]

scenarios.forEach(function([ scenario, sampling, expected ]) {   
   test(`new Path(url).href: ${scenario}`, function() {  
      const resulted = new Path(sampling).href
      expect(resulted).toBe(expected as any)
      // console.log('sampling:', sampling)
   })
})
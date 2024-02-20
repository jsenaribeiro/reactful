"user server"

import { delay } from '../../../commons/src'
import { db } from "./db"

const SECRET_KEY = '0123456789'

export async function post(request: Request) {
   await delay(3000)

   const AUTHORIZATION = request.headers.get('authorization')
   const UNAUTHORIZED = { status: 401, headers: { 'Content-Type': 'text/plain' }}
   const NO_HEADERS = 'Authorization header missing!'
   const NOT_LOGIN = 'Authentication failed!'
   
   if (!AUTHORIZATION?.startsWith('Basic ')) 
      return new Response(NO_HEADERS, UNAUTHORIZED)

   const auth = AUTHORIZATION.split(' ')[1]
   const credential = Buffer.from(auth, 'base64').toString('utf-8')
   const [ username, password ] = credential.split(':')
   const exists = await db.has(username, password)
   const settings = exists ? { } : UNAUTHORIZED   
   const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
   const text = exists ? JSON.stringify({ access_token }) : NOT_LOGIN 
 
   return new Response(text, settings)
}
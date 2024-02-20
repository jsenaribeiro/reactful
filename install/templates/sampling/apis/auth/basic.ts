import { db } from "./db"

const NO_HEADERS = 'Authorization header missing!'
const UNAUTHORIZED = 'Authentication failed!'

export async function post(request: Request) {
   const auth = request.headers.get('authorization')
   const headOk = { 'Content-Type': 'text/plain' }
   const headers = { ...headOk, 'WWW-Authenticate': 'Basic realm="Restricted Area"'  }
   
   if (!auth || !auth.startsWith('Basic ')) 
      return new Response(NO_HEADERS, { status: 401, headers })

   const encodedCredentials = auth.split(' ')[1]
   const credentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8')
   const [username, password] = credentials.split(':')
 
   return await db.has(username, password)
      ? new Response('ok', { headers: headOk })
      : new Response(UNAUTHORIZED, { status:401, headers })
}
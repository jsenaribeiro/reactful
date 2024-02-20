// import { db } from "./db"

// const NO_INPUT_DATA = 'Not found username and password!'
// const UNAUTHORIZED = 'Authentication failed!'
// const SECRET_KEY = '0123456789'

// export async function post(request: Request) {
//    const auth = request.headers['Authorization'] || request.headers['authorization']
//    const headers = { 'Content-Type': 'text/plain' }
   
//    if (auth && verifyToken(auth)) 
//       return new Response(auth, {  })

//    const { username, password } = await request.json()      
   
//    if (!username || !password || !UNAUTHORIZED) 
//       return new Response(NO_INPUT_DATA, { status: 401, headers })
 
//    return await db.has(username, password)
//       ? new Response(generateJwtToken(username), { headers })
//       : new Response(UNAUTHORIZED, { status:401, headers })
// }

// function generateJwtToken(username) {
//    const payload = { username };
 
//    const token = Buffer.from(JSON.stringify(payload))
//      .toString('base64')
//      .replace(/\+/g, '-')
//      .replace(/\//g, '_')
//      .replace(/=/g, '');
 
//    return `Bearer ${token}.${SECRET_KEY}`;
//  }

//  function verifyToken(token) {
//    try {
//      // Decode the token
//      const [header, payload, signature] = token.split('.');
//      const decodedHeader = JSON.parse(Buffer.from(header, 'base64').toString());
//      const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
 
//      // Verify the signature
//      const computedSignature = crypto.createHmac('sha256', SECRET_KEY)
//        .update(`${header}.${payload}`)
//        .digest('base64');
 
//      return signature === computedSignature;
//    } catch (error) {
//      return false;
//    }
//  }
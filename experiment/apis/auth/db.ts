const database = [
   { username: 'usr', password: 'pwd' },
   { username: 'test', password: '123' },
]

export const db = {
   
   has(username, password) {
      const contains = database
         .filter(x => x.username == username)
         .some(x => x.password == password)

      return Promise.resolve(contains)
   }
}
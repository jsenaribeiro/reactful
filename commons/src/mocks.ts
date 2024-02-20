const IS_SERVER_SIDE = !globalThis.document
const memoryStorage = [{ field:'', value:'' }]

export { }

if (IS_SERVER_SIDE) {
   
   // @ts-ignore
   globalThis['sessionStorage'] = {
      get length(){ return memoryStorage.length },
      get(field){ return memoryStorage.find(x => x.field == field) },
      getItem(field) { return this.get(field)?.value || null },
      setItem(field, value){  
         const entry = this.get(field)
         if (entry) entry.value = value
         else memoryStorage.push({ field, value })
      },
      removeItem(field) {
         for (let i = 0; i < memoryStorage.length; i++) 
            if (memoryStorage[i].field == field)
               delete memoryStorage[i]
      }
   }
}
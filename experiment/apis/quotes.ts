export function get(request: Request) {
   function getRandomInt(max) { return Math.floor(Math.random() * max); }    

   const messages = [
      "Man is the measure of all things (Protagoras)",
      "The unexamined life is not worth living (Socrates)",
      "One cannot step twice in the same river (Heraclitus)",
      "Life must be understood backward. But it must be lived forward (Kierkegaard)",
      "Science is what you know. Philosophy is what you don't know (Russell)",
      "I can control my passions and emotions if I can understand their nature (Spinoza)" 
   ]

   const message = messages[getRandomInt(messages.length)]

   return new Response(message)
}
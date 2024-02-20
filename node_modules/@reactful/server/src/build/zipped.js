// need load this file and save with path info
// and load in client-side with ZLib loaded

// PATH HERE!!!
const response = await fetch(path)
const arrayBuffer = await response.arrayBuffer()

const bytes = new Uint8Array(arrayBuffer)
const buffer = Zlib.inflateRawSync(bytes)
const bundler = buffer.toString('utf-8')

eval(bundler)  
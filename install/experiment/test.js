import { startup } from '../startup.js'
import path from 'path'
import fs from 'fs'

removeDirSync('./sample')
removeDirSync('./test')

startup('../')

function removeDirSync(dirPath) {
   if (!fs.existsSync(dirPath)) return

   fs.readdirSync(dirPath).forEach(file => {
      const curPath = path.join(dirPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
          removeDirSync(curPath)
      } else {
          fs.unlinkSync(curPath)
      }
  })
  
  fs.rmdirSync(dirPath)
}
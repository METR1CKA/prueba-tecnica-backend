import fs from 'fs'
import makeRandomString from '../app/services/service'

const filename = '.env'

if (!fs.existsSync(filename)) {
  console.log(`File ${filename} does not exist`)
  process.exit(1)
}

const env = fs.readFileSync(filename, 'utf-8')

if (env.includes('APP_KEY')) {
  console.log('APP_KEY already exists')
  process.exit(0)
}

const key = makeRandomString(32)
const data = `\nAPP_KEY=${key}`

fs.appendFileSync(filename, data)

console.log('APP_KEY generated successfully')
process.exit(0)
import 'reflect-metadata'
import { config } from 'dotenv'
import { join } from 'path'

import { App, MongoContainer } from './App'
import Container from 'typedi'

config({
	path: join(__dirname, '..', '.env'),
})

const port = parseInt(process.env.PORT as string) ?? (process.env.PORT || 8080)

new App(port)

Container.get(MongoContainer).init(process.env.MONGO_HOST ?? 'localhost:27017', process.env.MONGO_DB ?? 'ecbetTest')

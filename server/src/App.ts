import 'reflect-metadata'
import express from 'express'
import { useContainer, useExpressServer } from 'routing-controllers'
import Container, { Service } from 'typedi'
import { MainController } from './controllers/Controller'
import mongoose from 'mongoose'
import assert from 'assert'
import { Logger } from './Logger'
import { UserController } from './controllers/UserController'
import cors from 'cors'

export const Log = Container.get(Logger)

@Service()
export class MongoContainer {
	public connection = typeof mongoose
	async init(connection_url: string, db_name: string): Promise<typeof mongoose> {
		try {
			const url = `${connection_url}`

			Log.info(url)
			const connection = await mongoose.connect(url, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				useFindAndModify: false,
				useCreateIndex: true,
				dbName: db_name,
			})

			assert(connection === mongoose && `Failed to connect`)
			Log.debug('Connected to database: ', url)

			return connection
		} catch (err) {
			Log.error(__filename, err)
			throw err
		}
	}
}

export class ExpressConfiguration {
	public app: express.Application

	constructor() {
		this.app = express()
		this.middleware()
		this.setUpControllers()
	}

	middleware() {
		this.app.use(cors())
	}

	setUpControllers() {
		useContainer(Container)
		useExpressServer(this.app, {
			controllers: [MainController, UserController],
			development: true,
			defaults: {
				paramOptions: {
					required: true, // this means that all parameters (@BodyParam, @Param etc in Actions) are required by default
				},
			},
		})
	}
}

export class App {
	public express: ExpressConfiguration

	constructor(port: number) {
		this.express = new ExpressConfiguration()

		this.express.app.listen(port, () => Log.info(`Listening on port ${port}`))
	}
}

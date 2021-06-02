declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string
			SECRET_KEY: string
			MONGO_HOST: string
			MONGO_DB: string
		}
	}
}
export {}

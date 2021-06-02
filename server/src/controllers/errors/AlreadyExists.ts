import { HttpError } from 'routing-controllers'

export class AlreadyExists extends HttpError {
	public operationName: string
	public args: any[]

	constructor(operationName?: string, args: any[] = []) {
		super(409)
		Object.setPrototypeOf(this, AlreadyExists.prototype)
		this.operationName = operationName ?? ''
	}

	toJSON() {
		return {
			status: this.httpCode,
			failedOperation: this.operationName,
		}
	}
}

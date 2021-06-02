import { Service } from 'typedi'

export enum LogLevelEnum {
	debug,
	info,
	warn,
	error,
}

@Service()
export class Logger {
	public logLevel: LogLevelEnum = 0

	private getDate(): string {
		let date = new Date()
		let dStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
		return dStr
	}
	public debug(fmt: string, ...additions: any[]): void {
		if (this.logLevel > LogLevelEnum.debug) {
			return
		}
		console.debug(this.getDate() + ` [debug]  ` + fmt, ...additions)
	}
	public info(fmt: string, ...additions: any[]): void {
		if (this.logLevel > LogLevelEnum.info) {
			return
		}
		console.info('\x1b[36m%s\x1b[0m', `[info] `, '\x1b[0m', this.getDate(), fmt, ...additions)
	}
	public warn(fmt: string, ...additions: any[]): void {
		if (this.logLevel > LogLevelEnum.warn) {
			return
		}

		console.warn('\x1b[33m%s\x1b[0m', `[warn] `, '\x1b[0m', this.getDate(), fmt, ...additions)
	}
	public error(fmt: any, ...additions: any[]): void {
		if (this.logLevel > LogLevelEnum.error) {
			return
		}

		console.error('\x1b[31m%s\x1b[0m', `[error] ` + ' ' + this.getDate() + ' ' + fmt, '\x1b[0m', ...additions)
	}
}

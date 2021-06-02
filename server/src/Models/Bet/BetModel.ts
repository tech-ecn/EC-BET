import { getModelForClass, modelOptions, prop, Ref, ReturnModelType, Severity } from '@typegoose/typegoose'
import { Service } from 'typedi'

@modelOptions({
	schemaOptions: {
		collection: 'Bet',
		timestamps: true,
	},
	options: {
		allowMixed: Severity.WARN,
	},
})
export default class BetRepository {
	@prop({ required: true, unique: true })
	uid: string

	@prop()
	bet_counter: number

	@prop()
	start: Date

	@prop()
	end: Date

	@prop({ required: true })
	tx: string

	@prop()
	betName: string
}

@Service()
export class BetModel {
	public model: ReturnModelType<typeof BetRepository, {}>
	constructor() {
		this.model = getModelForClass(BetRepository)
	}
}

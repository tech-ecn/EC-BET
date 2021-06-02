import { getModelForClass, modelOptions, prop, Ref, ReturnModelType, Severity } from '@typegoose/typegoose'
import { Service } from 'typedi'
import UserRepository from '../User/UserModel'

@modelOptions({
	schemaOptions: {
		collection: 'BetInstance',
		timestamps: true,
	},
	options: {
		allowMixed: Severity.WARN,
	},
})
export default class BetInstanceRepository {
	@prop({ required: true, unique: true })
	uid: string

	@prop()
	bet_name: string

	@prop()
	bet_counter: number

	@prop({ default: false })
	ended?: boolean

	@prop()
	bet_instance_counter: number

	@prop({ default: 2 })
	fees?: number

	@prop({ ref: 'UserRepository' })
	bettor_a: Ref<UserRepository>

	@prop({ required: false })
	bettor_b?: Ref<UserRepository>

	@prop()
	start: Date

	@prop()
	end: Date

	@prop({ required: true })
	tx: string

	@prop()
	tx_b?: string

	@prop({ required: true })
	bet_amount: string
}

@Service()
export class BetInstanceModel {
	public model: ReturnModelType<typeof BetInstanceRepository, {}>
	constructor() {
		this.model = getModelForClass(BetInstanceRepository)
	}
}

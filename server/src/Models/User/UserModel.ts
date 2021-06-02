import { getModelForClass, modelOptions, prop, ReturnModelType, Ref } from '@typegoose/typegoose'
import { Service } from 'typedi'
import BetInstanceRepository from '../BetInstance/BetInstanceModel'

@modelOptions({
	schemaOptions: {
		collection: 'User',
		timestamps: true,
	},
})
export default class UserRepository {
	@prop({ default: false })
	admin?: boolean

	@prop({ unique: true })
	uid: string

	@prop({ required: true })
	name: string

	@prop({ required: true, unique: true, trim: true })
	email: string

	@prop({ minlength: 8, maxlength: 100 })
	password: string

	@prop({ ref: 'Bet' })
	bets?: Ref<BetInstanceRepository>[]
}

@Service()
export class UserModel {
	public model: ReturnModelType<typeof UserRepository, {}>
	constructor() {
		this.model = getModelForClass(UserRepository)
	}
}

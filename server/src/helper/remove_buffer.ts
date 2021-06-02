import { DocumentType } from '@typegoose/typegoose'

export function remove_buffer(elem: DocumentType<any>, args = ['_id']) {
	elem = elem.toObject()
	args.forEach((key) => {
		const id = elem[key].toString()
		elem[key] = id
	})
	return elem
}

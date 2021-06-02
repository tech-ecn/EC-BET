const { readFileSync, writeFileSync } = require('fs')

const { join, resolve } = require('path')
require('dotenv').config({
	path: join(__dirname, '..', '.env'),
})

const file_path = process.env.FILE_PATH ? join(resolve(process.env.FILE_PATH), 'addresses.json') : join(__dirname, '..', 'addresses.json')

const data = JSON.parse(readFileSync(file_path).toString())

const Bet = artifacts.require('Bet')

const TestToken = artifacts.require('TestToken')

module.exports = function (deployer, _, accounts) {
	return deployer.deploy(TestToken, '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b').then((test) => {
		return deployer.deploy(Bet, 100, test.address, accounts[0], '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b').then((factory) => {
			data['bet'] = factory.address
			data['token'] = test.address
			writeFileSync(file_path, JSON.stringify(data, undefined, 4))
		})
	})
}

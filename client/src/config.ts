import addresses from './addresses.json'
import { abi as migABI } from './contracts/Migrations.json'
import { abi as bABI } from './contracts/Bet.json'

import { abi as tABI } from './contracts/TestToken.json'

export const MigrationsAddress = addresses.migrations

export const BetAddress = addresses.bet
export const TokenAddress = addresses.token

export const MigrationsABI = migABI
export const BetABI = bABI
export const TokenABI = tABI

export const TrustedFowarder = '0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b'

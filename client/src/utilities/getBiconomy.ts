import abi from 'ethereumjs-abi'
import { toBuffer } from 'ethereumjs-util'
import Web3 from 'web3'

export const Biconomy = (window as any).Biconomy

export const constructMetaTransactionMessage = (nonce: any, chainId: any, functionSignature: any, contractAddress: any) => {
	return abi.soliditySHA3(['uint256', 'address', 'uint256', 'bytes'], [nonce, contractAddress, chainId, toBuffer(functionSignature)])
}

export const getSignatureParameters = (signature: any, web3: Web3) => {
	if (!web3.utils.isHexStrict(signature)) {
		throw new Error('Given value "'.concat(signature, '" is not a valid hex string.'))
	}
	var r = signature.slice(0, 66)
	var s = '0x'.concat(signature.slice(66, 130))
	var v: any = '0x'.concat(signature.slice(130, 132))
	v = web3.utils.hexToNumber(v)
	if (![27, 28].includes(v)) v += 27
	return {
		r: r,
		s: s,
		v: v,
	}
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { BigNumber } from "bignumber.js";

export interface IRelayRecipientContract
  extends Truffle.Contract<IRelayRecipientInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<IRelayRecipientInstance>;
}

type AllEvents = never;

export interface IRelayRecipientInstance extends Truffle.ContractInstance {
  /**
   * return if the forwarder is trusted to forward relayed transactions to us. the forwarder is required to verify the sender's signature, and verify the call is not a replay.
   */
  isTrustedForwarder(
    forwarder: string | BigNumber,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  /**
   * return the sender of this call. if the call came through our trusted forwarder, then the real sender is appended as the last 20 bytes of the msg.data. otherwise, return `msg.sender` should be used in the contract anywhere instead of msg.sender
   */
  versionRecipient(txDetails?: Truffle.TransactionDetails): Promise<string>;
}
/**
* This file was automatically generated by @oraichain/ts-codegen@0.35.9.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @oraichain/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import {HexBinary, Boolean} from "./types";
import {InstantiateMsg, ExecuteMsg, AssetInfo, Addr, UpdatePairMsg, QueryMsg, MigrateMsg, ConfigResponse} from "./TonbridgeBridge.types";
export interface TonbridgeBridgeReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  isTxProcessed: ({
    txHash
  }: {
    txHash: HexBinary;
  }) => Promise<Boolean>;
}
export class TonbridgeBridgeQueryClient implements TonbridgeBridgeReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.isTxProcessed = this.isTxProcessed.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  isTxProcessed = async ({
    txHash
  }: {
    txHash: HexBinary;
  }): Promise<Boolean> => {
    return this.client.queryContractSmart(this.contractAddress, {
      is_tx_processed: {
        tx_hash: txHash
      }
    });
  };
}
export interface TonbridgeBridgeInterface extends TonbridgeBridgeReadOnlyInterface {
  contractAddress: string;
  sender: string;
  readTransaction: ({
    blockBoc,
    opcode,
    txBoc,
    validatorContractAddr
  }: {
    blockBoc: HexBinary;
    opcode: HexBinary;
    txBoc: HexBinary;
    validatorContractAddr: string;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateMappingPair: ({
    denom,
    localAssetInfo,
    localAssetInfoDecimals,
    localChannelId,
    remoteDecimals
  }: {
    denom: string;
    localAssetInfo: AssetInfo;
    localAssetInfoDecimals: number;
    localChannelId: string;
    remoteDecimals: number;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class TonbridgeBridgeClient extends TonbridgeBridgeQueryClient implements TonbridgeBridgeInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.readTransaction = this.readTransaction.bind(this);
    this.updateMappingPair = this.updateMappingPair.bind(this);
  }

  readTransaction = async ({
    blockBoc,
    opcode,
    txBoc,
    validatorContractAddr
  }: {
    blockBoc: HexBinary;
    opcode: HexBinary;
    txBoc: HexBinary;
    validatorContractAddr: string;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      read_transaction: {
        block_boc: blockBoc,
        opcode,
        tx_boc: txBoc,
        validator_contract_addr: validatorContractAddr
      }
    }, _fee, _memo, _funds);
  };
  updateMappingPair = async ({
    denom,
    localAssetInfo,
    localAssetInfoDecimals,
    localChannelId,
    remoteDecimals
  }: {
    denom: string;
    localAssetInfo: AssetInfo;
    localAssetInfoDecimals: number;
    localChannelId: string;
    remoteDecimals: number;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_mapping_pair: {
        denom,
        local_asset_info: localAssetInfo,
        local_asset_info_decimals: localAssetInfoDecimals,
        local_channel_id: localChannelId,
        remote_decimals: remoteDecimals
      }
    }, _fee, _memo, _funds);
  };
}
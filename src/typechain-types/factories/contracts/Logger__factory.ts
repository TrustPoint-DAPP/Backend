/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Logger, LoggerInterface } from "../../contracts/Logger";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "OnlyNFTContractsAllowed",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
    ],
    name: "addNFTContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "emitApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "emitTransferBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "emitTransferSingle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "emitURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nftContracts",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610c18806100616000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100d6578063ada0f98f146100f4578063bcee357914610124578063cfac5d7c146101405761007d565b80631e7006e714610082578063205b13af1461009e57806355c45fbe146100ba575b600080fd5b61009c600480360381019061009791906106c7565b61015c565b005b6100b860048036038101906100b39190610785565b610234565b005b6100d460048036038101906100cf9190610838565b610313565b005b6100de610416565b6040516100eb919061089a565b60405180910390f35b61010e600480360381019061010991906108b5565b61043c565b60405161011b91906108f1565b60405180910390f35b61013e60048036038101906101399190610962565b61045c565b005b61015a600480360381019061015591906108b5565b610541565b005b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166101de576040517f406ad2fd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b803373ffffffffffffffffffffffffffffffffffffffff167f48320a3d694934f39244b1452ac1eb0c086f718a40d8db923295cdab584a9c878585604051610227929190610a7c565b60405180910390a3505050565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166102b6576040517f406ad2fd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167fb5f694465623d21365f3213ba19d566f9c4da6320860cf276fbd06d6c8ef79b28686868686604051610304959493929190610aaf565b60405180910390a25050505050565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610395576040517f406ad2fd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fb07c21540917d6c26160ba8bb76ed75a69387e4030b1292d8626576ada952b308460405161040991906108f1565b60405180910390a4505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006020528060005260406000206000915054906101000a900460ff1681565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166104de576040517f406ad2fd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167f3a89e87bc03038fe90003d353eda59019c01666b47406064258eec88d3a4f959888888888888886040516105309796959493929190610b7d565b60405180910390a250505050505050565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146105c8576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60016000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f8401126106515761065061062c565b5b8235905067ffffffffffffffff81111561066e5761066d610631565b5b60208301915083600182028301111561068a57610689610636565b5b9250929050565b6000819050919050565b6106a481610691565b81146106af57600080fd5b50565b6000813590506106c18161069b565b92915050565b6000806000604084860312156106e0576106df610622565b5b600084013567ffffffffffffffff8111156106fe576106fd610627565b5b61070a8682870161063b565b9350935050602061071d868287016106b2565b9150509250925092565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061075282610727565b9050919050565b61076281610747565b811461076d57600080fd5b50565b60008135905061077f81610759565b92915050565b600080600080600060a086880312156107a1576107a0610622565b5b60006107af88828901610770565b95505060206107c088828901610770565b94505060406107d188828901610770565b93505060606107e2888289016106b2565b92505060806107f3888289016106b2565b9150509295509295909350565b60008115159050919050565b61081581610800565b811461082057600080fd5b50565b6000813590506108328161080c565b92915050565b60008060006060848603121561085157610850610622565b5b600061085f86828701610770565b935050602061087086828701610770565b925050604061088186828701610823565b9150509250925092565b61089481610747565b82525050565b60006020820190506108af600083018461088b565b92915050565b6000602082840312156108cb576108ca610622565b5b60006108d984828501610770565b91505092915050565b6108eb81610800565b82525050565b600060208201905061090660008301846108e2565b92915050565b60008083601f8401126109225761092161062c565b5b8235905067ffffffffffffffff81111561093f5761093e610631565b5b60208301915083602082028301111561095b5761095a610636565b5b9250929050565b600080600080600080600060a0888a03121561098157610980610622565b5b600061098f8a828b01610770565b97505060206109a08a828b01610770565b96505060406109b18a828b01610770565b955050606088013567ffffffffffffffff8111156109d2576109d1610627565b5b6109de8a828b0161090c565b9450945050608088013567ffffffffffffffff811115610a0157610a00610627565b5b610a0d8a828b0161090c565b925092505092959891949750929550565b600082825260208201905092915050565b82818337600083830152505050565b6000601f19601f8301169050919050565b6000610a5b8385610a1e565b9350610a68838584610a2f565b610a7183610a3e565b840190509392505050565b60006020820190508181036000830152610a97818486610a4f565b90509392505050565b610aa981610691565b82525050565b600060a082019050610ac4600083018861088b565b610ad1602083018761088b565b610ade604083018661088b565b610aeb6060830185610aa0565b610af86080830184610aa0565b9695505050505050565b600082825260208201905092915050565b600080fd5b82818337505050565b6000610b2d8385610b02565b93507f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff831115610b6057610b5f610b13565b5b602083029250610b71838584610b18565b82840190509392505050565b600060a082019050610b92600083018a61088b565b610b9f602083018961088b565b610bac604083018861088b565b8181036060830152610bbf818688610b21565b90508181036080830152610bd4818486610b21565b90509897505050505050505056fea264697066735822122092bf0ebaceaab88859a0bf00fddb02da9c4f5124c699a010d2447769e6f12ad764736f6c63430008110033";

type LoggerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LoggerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Logger__factory extends ContractFactory {
  constructor(...args: LoggerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Logger> {
    return super.deploy(overrides || {}) as Promise<Logger>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Logger {
    return super.attach(address) as Logger;
  }
  override connect(signer: Signer): Logger__factory {
    return super.connect(signer) as Logger__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LoggerInterface {
    return new utils.Interface(_abi) as LoggerInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Logger {
    return new Contract(address, _abi, signerOrProvider) as Logger;
  }
}

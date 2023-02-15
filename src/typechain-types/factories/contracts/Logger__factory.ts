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
  "0x608060405234801561001057600080fd5b50600180546001600160a01b03191633179055610719806100326000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100bd578063ada0f98f146100ed578063bcee357914610120578063cfac5d7c1461013357600080fd5b80631e7006e714610082578063205b13af1461009757806355c45fbe146100aa575b600080fd5b6100956100903660046103ce565b610146565b005b6100956100a5366004610462565b6101bf565b6100956100b83660046104b7565b610252565b6001546100d0906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6101106100fb366004610503565b60006020819052908152604090205460ff1681565b60405190151581526020016100e4565b61009561012e366004610571565b6102e0565b610095610141366004610503565b610366565b3360009081526020819052604090205460ff166101765760405163406ad2fd60e01b815260040160405180910390fd5b80336001600160a01b03167f48320a3d694934f39244b1452ac1eb0c086f718a40d8db923295cdab584a9c8785856040516101b2929190610613565b60405180910390a3505050565b3360009081526020819052604090205460ff166101ef5760405163406ad2fd60e01b815260040160405180910390fd5b604080516001600160a01b03878116825286811660208301528516818301526060810184905260808101839052905133917fb5f694465623d21365f3213ba19d566f9c4da6320860cf276fbd06d6c8ef79b2919081900360a00190a25050505050565b3360009081526020819052604090205460ff166102825760405163406ad2fd60e01b815260040160405180910390fd5b816001600160a01b0316836001600160a01b0316336001600160a01b03167fb07c21540917d6c26160ba8bb76ed75a69387e4030b1292d8626576ada952b30846040516102d3911515815260200190565b60405180910390a4505050565b3360009081526020819052604090205460ff166103105760405163406ad2fd60e01b815260040160405180910390fd5b336001600160a01b03167f3a89e87bc03038fe90003d353eda59019c01666b47406064258eec88d3a4f95988888888888888604051610355979695949392919061068d565b60405180910390a250505050505050565b6001546001600160a01b031633146103aa576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001600160a01b03166000908152602081905260409020805460ff19166001179055565b6000806000604084860312156103e357600080fd5b833567ffffffffffffffff808211156103fb57600080fd5b818601915086601f83011261040f57600080fd5b81358181111561041e57600080fd5b87602082850101111561043057600080fd5b6020928301989097509590910135949350505050565b80356001600160a01b038116811461045d57600080fd5b919050565b600080600080600060a0868803121561047a57600080fd5b61048386610446565b945061049160208701610446565b935061049f60408701610446565b94979396509394606081013594506080013592915050565b6000806000606084860312156104cc57600080fd5b6104d584610446565b92506104e360208501610446565b9150604084013580151581146104f857600080fd5b809150509250925092565b60006020828403121561051557600080fd5b61051e82610446565b9392505050565b60008083601f84011261053757600080fd5b50813567ffffffffffffffff81111561054f57600080fd5b6020830191508360208260051b850101111561056a57600080fd5b9250929050565b600080600080600080600060a0888a03121561058c57600080fd5b61059588610446565b96506105a360208901610446565b95506105b160408901610446565b9450606088013567ffffffffffffffff808211156105ce57600080fd5b6105da8b838c01610525565b909650945060808a01359150808211156105f357600080fd5b506106008a828b01610525565b989b979a50959850939692959293505050565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b81835260007f07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83111561067457600080fd5b8260051b80836020870137939093016020019392505050565b60006001600160a01b03808a168352808916602084015280881660408401525060a060608301526106c260a083018688610642565b82810360808401526106d5818587610642565b9a995050505050505050505056fea26469706673582212205b849c4e28e65832a4c17731c0aa7a951a6d5e5bb13bdc3402744616cd9c071a64736f6c63430008110033";

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

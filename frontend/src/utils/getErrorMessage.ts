import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";

export const getErrorMessage = (error: Error): string => {
  switch (error.constructor) {
    case NoEthereumProviderError:
      return `No Ethereum browser extension detected. Please install MetaMask extension.`;
    case UnsupportedChainIdError:
      return `You're connected to an unsupported network.`;
    case UserRejectedRequestError:
      return `Please authorize this website to access your Ethereum account.`;
    default:
      return error.message;
  }
};

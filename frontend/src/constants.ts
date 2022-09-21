import { ChainId } from "./utils/getInjectedConnectors";

export const contractAddress: { [key: number]: string } = {
  [ChainId.Ethereum]: "0x",
  [ChainId.Ropsten]: "0x",
  [ChainId.Rinkeby]: "0x",
  [ChainId.Görli]: "0x",
  [ChainId.Kovan]: "0x",
  [ChainId.Polygon]: "0x",
  [ChainId.GoChain]: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
};

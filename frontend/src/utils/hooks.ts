import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { injected } from "./connectors";
import { Provider } from "./provider";

export function useEagerConnect(): boolean {
  const { activate, active } = useWeb3React<Provider>();

  const [tried, setTried] = useState(false);

  // use useCallback() and useEffect() hooks together so that attemptActivation() will only
  // be called once when attempting eager connection
  const attemptActivation = useCallback(() => {
    async function _tryActivate() {
      const isAuthorized = await injected.isAuthorized();

      if (isAuthorized) {
        try {
          await activate(injected, undefined, true);
        } catch (error) {
          const message = (error as any).message;
          window.alert("Error!" + (error && message ? `\n\n${message}` : ""));
        }
      }

      setTried(true);
    }

    _tryActivate();
  }, [activate]);

  useEffect(() => {
    attemptActivation();
  }, [attemptActivation]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
}

export function useInactiveListener(suppress: boolean = false): void {
  const { active, error, activate } = useWeb3React<Provider>();

  useEffect((): (() => void) | undefined => {
    const { ethereum } = window as any;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = (): void => {
        console.log("Handling 'connect' event");
        activate(injected);
      };

      const handleChainChanged = (chainId: string | number): void => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };

      const handleAccountsChanged = (accounts: string[]): void => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      // cleanup function
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [active, error, suppress, activate]);
}

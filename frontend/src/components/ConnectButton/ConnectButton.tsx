import { Button } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Provider } from "../../utils/provider";
import { injected } from "../../utils/connectors";
import useAppNotification, { Status } from "../../providers/AppNotification";
import { getShortAddress } from "../../utils/getShortAddress";

const ConnectButton = () => {
  const context = useWeb3React<Provider>();
  const [activating, setActivating] = useState<boolean>(false);
  const setNotification = useAppNotification();

  const { error, activate, active } = context;

  useEffect(() => {
    if (error) {
      const description = getErrorMessage(error);
      console.log(description);
      setNotification!!({
        title: "Error Connecting",
        description,
        status: Status.Error,
      });
    }
  }, [error, setNotification]);

  const connectToWallet = useCallback(async () => {
    console.log("Connecting to wallet");
    setActivating(true);
    await activate(injected);
    setActivating(false);
  }, [activate, setActivating]);

  return (
    <Button onClick={connectToWallet} disabled={activating}>
      {active ? getShortAddress(context.account!) : "Connect Wallet"}
    </Button>
  );
};

export default ConnectButton;

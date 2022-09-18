import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { useCallback, useReducer } from "react";
import AppBar from "./components/AppBar/AppBar";
import { AppStoreProvider, reducer, State } from "./providers/AppStore";
import { AppNotificationProvider } from "./providers/AppNotification";
import CounterControl from "./components/CounterControl/CounterControl";

const initialState: State = {};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useToast();

  const setNotification = useCallback(
    (options: UseToastOptions) => {
      console.log("Setting toast");
      toast({ ...options, isClosable: true, position: "top" });
    },
    [toast]
  );

  return (
    <AppStoreProvider value={{ state, dispatch }}>
      <AppNotificationProvider value={setNotification}>
        <Box>
          <AppBar />
          <CounterControl />
        </Box>
      </AppNotificationProvider>
    </AppStoreProvider>
  );
};

export default App;

import { Box, Button, Center, Flex, Text, VStack } from "@chakra-ui/react";

const CounterControl = () => {
  return (
    <Center height={"200"}>
      <VStack>
        <Box>
          <Text fontSize={"3xl"}>Current Value: {}</Text>
        </Box>
        <Flex m={1}>
          <Button onClick={console.log} m={3}>
            Decrement Counter
          </Button>
          <Button onClick={console.log} m={3}>
            Increment Counter
          </Button>
        </Flex>
      </VStack>
    </Center>
  );
};

export default CounterControl;

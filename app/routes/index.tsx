import { Flex, Text } from "@chakra-ui/react";
import { Link } from "remix";
import { Header } from "~/components/header";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Header />
      <Flex direction={"column"} p={10} alignItems={"center"}>
        <Link to="/races">
          <Flex
            minWidth={60}
            minHeight={20}
            border={"1px solid"}
            justifyContent={"space-between"}
            alignItems={"center"}
            borderRadius={10}
            px={12}
            backgroundColor={"gray.100"}
            borderColor={"gray.200"}
          >
            <img
              src="/yosou.svg"
              alt="yosou"
              style={{ width: 36, height: 36 }}
            />
            <Text fontSize={"xl"} fontWeight={900} color="brand.800">
              レース予想
            </Text>
          </Flex>
        </Link>
      </Flex>
    </div>
  );
}

import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { Flex, Heading } from "@chakra-ui/react";
import { Link } from "remix";
import { APP_TITLE } from "~/constants/app.const";

export const Header: React.VFC = () => (
  <Flex
    as="header"
    align="center"
    justify="space-between"
    wrap="wrap"
    padding="1.5rem"
    bg="brand.900"
    color="white"
    width="100%"
    position="sticky"
    m={0}
    top={0}
    zIndex={99}
  >
    <Flex align="center" mr={5}>
      <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
        <Link to="/" title={APP_TITLE} area-label={APP_TITLE}>
          <span>{APP_TITLE}</span>
        </Link>
      </Heading>
    </Flex>
    <Link to={`/about`}>
      <QuestionOutlineIcon
        h={8}
        w={8}
        color={"rgba(255,255,255,0.8)"}
        _hover={{ color: "rgba(255,255,255)" }}
      />
    </Link>
  </Flex>
);

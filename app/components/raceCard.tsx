import { Center } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const RaceCard: React.FC<Props> = ({ children }) => {
  return (
    <Center
      boxShadow={"2xl"}
      rounded={"md"}
      p={5}
      background={"gray.100"}
      justifyContent={"space-between"}
      minW={250}
    >
      {children}
    </Center>
  );
};

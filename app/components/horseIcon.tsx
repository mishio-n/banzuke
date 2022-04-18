import { Box, Flex } from "@chakra-ui/react";
import { ComponentProps } from "react";
import { RaceTierListHorse } from "~/models/raceTierList.server";

type Props = ComponentProps<typeof Box> & {
  horse: RaceTierListHorse;
  frameColor?: string;
  fontColor?: string;
  forwardRef: (element?: HTMLElement | null) => any;
};

export const HorseIcon: React.VFC<Props> = ({
  horse,
  frameColor,
  fontColor,
  forwardRef,
  ...props
}) => (
  <Box {...props} ref={forwardRef}>
    <Flex
      rounded={"24px"}
      backgroundColor={frameColor !== undefined ? frameColor : ""}
      width={"48px"}
      height={"48px"}
      justifyContent={"center"}
      alignItems={"center"}
      color={fontColor !== undefined ? fontColor : ""}
      fontWeight={"bold"}
    >
      <span>{horse.horseNum}</span>
    </Flex>
  </Box>
);

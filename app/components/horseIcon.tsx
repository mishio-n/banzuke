import { Box, Flex } from "@chakra-ui/react";
import { ComponentProps } from "react";
import unknownIcon from "~/assets/image/unknown.svg";
import { Horse } from "~/models/horse.server";

type Props = ComponentProps<typeof Box> & {
  horse: Horse;
  mode: "COLORS" | "NUMBER";
  frameColor?: string;
  fontColor?: string;
  forwardRef: (element?: HTMLElement | null) => any;
};

export const HorseIcon: React.VFC<Props> = ({
  horse,
  mode,
  frameColor,
  fontColor,
  forwardRef,
  ...props
}) => (
  <Box {...props} ref={forwardRef}>
    <a target="_blank" href={horse.netkibaLink} rel="noreferrer">
      {mode === "COLORS" ? (
        <img src={horse.owner.colors ?? unknownIcon} alt={horse.name} />
      ) : (
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
          <span>{horse.gateNumber}</span>
        </Flex>
      )}
    </a>
  </Box>
);

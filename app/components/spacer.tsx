import { Box } from "@chakra-ui/react";

type Props = {
  width?: number;
  height?: number;
};

export const Spacer: React.VFC<Props> = (props) => <Box {...props} />;

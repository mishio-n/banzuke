import { Box, Flex } from "@chakra-ui/react";
import { getFrameNumber } from "~/logic/getFrameColor";
import { RaceTemplateHorse } from "~/models/raceTemplate.server";

type Props = {
  horseList: RaceTemplateHorse[];
  totalHorseNum: number;
};

export const RaceTable: React.VFC<Props> = ({ horseList, totalHorseNum }) => {
  return (
    <Flex direction={"column"}>
      {/* header */}
      <Flex>
        <Box>
          <span>枠番</span>
        </Box>
        <Box>
          <span>馬番</span>
        </Box>
        <Box>
          <span>馬名</span>
        </Box>
        <Box>
          <span>騎手</span>
        </Box>
      </Flex>
      {/* data */}
      {horseList.map((horse) => (
        <Flex key={`raceTable-${horse.horseNum}`}>
          <Box>
            <span>{getFrameNumber(horse.horseNum, totalHorseNum)}</span>
          </Box>
          <Box>
            <span>{horse.horseNum}</span>
          </Box>
          <Box>
            <span>{horse.horse}</span>
          </Box>
          <Box>
            <span>{horse.jockey}</span>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

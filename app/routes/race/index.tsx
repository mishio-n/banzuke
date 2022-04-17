import { Box, Flex, Switch } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "react-beautiful-dnd";
import { json, LoaderFunction, useLoaderData } from "remix";
import { HorseIcon } from "~/components/horseIcon";
import { getFrameColor, getFrameNumber } from "~/logic/getFrameColor";
import { reorder } from "~/logic/reorder";
import {
  getRaceTemplate,
  RaceTemplateHorse,
  RaceTemplateJson,
} from "~/models/raceTemplate.server";
import { RaceTierListJson } from "~/models/raceTierList.server";

type LoaderData = {
  data: {
    title: string;
    horseList: RaceTemplateHorse[];
    totalHorseNum: number;
  };
};

type DispMode = "COLORS" | "NUMBER";

export const loader: LoaderFunction = async () => {
  const templateData = await getRaceTemplate("202209020609");
  if (templateData === null) {
    return { status: 404 };
  }
  const raceTemplateJson = JSON.parse(templateData.json) as RaceTemplateJson;
  return json<LoaderData>({
    data: {
      title: templateData.title,
      totalHorseNum: raceTemplateJson.totalHoseNum,
      horseList: raceTemplateJson.horseList,
    },
  });
};

const reorderTierList = (
  tierList: RaceTierListJson,
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  const current = [...tierList[source.droppableId]];
  const next = [...tierList[destination.droppableId]];
  const target = current[source.index];

  // 同一リスト内での操作
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    return {
      ...tierList,
      [source.droppableId]: reordered,
    };
  }

  // 異なるリスト間での移動
  // 元のリストから削除
  current.splice(source.index, 1);
  // 移動先のリストへ追加
  next.splice(destination.index, 0, target);

  return {
    ...tierList,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };
};

export default function RaceIndexRoute() {
  const { data } = useLoaderData<LoaderData>();

  const [tierList, setTierList] = useState<RaceTierListJson>({
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    initialList: data.horseList.map((horse) => ({
      horseNum: horse.horseNum,
      horse: horse.horse,
    })),
  });

  const [windowReady, setWindowReady] = useState(false);
  const [mode, setMode] = useState<DispMode>("COLORS");

  useEffect(() => {
    setWindowReady(true);
  }, []);

  const isInitialList = useCallback(
    (rank: string) => rank === "initialList",
    []
  );

  if (!windowReady) {
    return <span>Loading</span>;
  }

  return (
    <>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          // リスト外
          if (!destination) {
            return;
          }

          setTierList(reorderTierList(tierList, source, destination));
        }}
      >
        <Box>
          {Object.entries(tierList).map(([rank, list]) => (
            <Flex key={rank}>
              {!isInitialList(rank) && (
                <Flex
                  justifyContent={"center"}
                  paddingX={5}
                  width={20}
                  alignItems={"center"}
                >
                  <span>{rank}</span>
                </Flex>
              )}
              <Droppable
                key={rank}
                droppableId={rank}
                type={"CARD"}
                direction={"horizontal"}
                isCombineEnabled={false}
              >
                {(dropProvided) => (
                  <Flex
                    ref={dropProvided.innerRef}
                    direction={"row"}
                    {...dropProvided.droppableProps}
                    minHeight={"65px"}
                    marginTop={isInitialList(rank) ? 20 : 0}
                    width={"100%"}
                    backgroundColor={"gray.100"}
                    alignItems={"center"}
                    padding={2}
                  >
                    {list.map((horse, index) => (
                      <Draggable
                        key={`draggable-${horse.horseNum}`}
                        draggableId={`draggable-${horse.horseNum}`}
                        index={index}
                      >
                        {(dragProvided) => (
                          <HorseIcon
                            {...dragProvided.dragHandleProps}
                            {...dragProvided.draggableProps}
                            forwardRef={dragProvided.innerRef}
                            mode={mode}
                            horse={horse}
                            frameColor={getFrameColor(
                              horse.horseNum!,
                              data.totalHorseNum
                            )}
                            fontColor={
                              getFrameNumber(
                                horse.horseNum!,
                                data.totalHorseNum
                              ) === 1
                                ? "rgb(60,60,60)"
                                : "white"
                            }
                          />
                        )}
                      </Draggable>
                    ))}
                    {dropProvided.placeholder}
                  </Flex>
                )}
              </Droppable>
            </Flex>
          ))}
        </Box>
      </DragDropContext>
      <Switch
        onChange={(event) => {
          setMode(event.target.checked ? "NUMBER" : "COLORS");
        }}
      />
    </>
  );
}

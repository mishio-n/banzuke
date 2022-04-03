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
import { getHorses, Horse } from "~/models/horse.server";

type LoaderData = {
  horses: Horse[];
};

type TierListMap = {
  S: Horse[];
  A: Horse[];
  B: Horse[];
  C: Horse[];
  D: Horse[];
  E: Horse[];
  initialList: Horse[];
};

type DispMode = "COLORS" | "NUMBER";

export const loader: LoaderFunction = async () => {
  const horses = await getHorses("2022-osakahai");
  return json<LoaderData>({
    horses,
  });
};

const reorderTierList = (
  tierList: TierListMap,
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
  const { horses } = useLoaderData<LoaderData>();

  const [tierList, setTierList] = useState<TierListMap>({
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    initialList: horses,
  });

  const [windowReady, setWindowReady] = useState(false);
  const [mode, setMode] = useState<DispMode>("COLORS");

  useEffect(() => {
    setWindowReady(true);
  }, []);

  const getHorseId = useCallback(
    (url: string) => url.substring(url.lastIndexOf("/") + 1),
    []
  );

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
                        key={getHorseId(horse.netkibaLink)}
                        draggableId={getHorseId(horse.netkibaLink)}
                        index={index}
                      >
                        {(dragProvided) => (
                          <HorseIcon
                            {...dragProvided.dragHandleProps}
                            {...dragProvided.draggableProps}
                            forwardRef={dragProvided.innerRef}
                            mode={mode}
                            horse={horse}
                            frameColor={getFrameColor(horse.gateNumber!, 16)}
                            fontColor={
                              getFrameNumber(horse.gateNumber!, 16) === 1
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

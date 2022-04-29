import { Box, Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  Droppable,
} from "react-beautiful-dnd";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { HorseIcon } from "~/components/horseIcon";
import { getFrameColor, getFrameNumber } from "~/logic/getFrameColor";
import { reorder } from "~/logic/reorder";
import {
  getRaceTemplate,
  RaceTemplateJson,
} from "~/models/raceTemplate.server";
import {
  createRaceTierList,
  getRaceTierList,
  RaceTierListJson,
} from "~/models/raceTierList.server";

type LoaderData = {
  data: {
    title: string;
    commennt: string;
    raceTierListJson: RaceTierListJson;
    totalHorseNum: number;
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const raceTierListId = params.tierListId;
  if (raceTierListId === undefined) {
    throw new Response("Bad Request", {
      status: 400,
    });
  }
  const raceTierListData = await getRaceTierList(raceTierListId);
  if (raceTierListData === null) {
    throw new Response("Not Found", { status: 404 });
  }
  const raceTierListJson = JSON.parse(
    raceTierListData.json
  ) as RaceTierListJson;
  const raceTemplateData = await getRaceTemplate(
    raceTierListData.raceTemplateId
  );
  if (raceTemplateData === null) {
    throw new Response("Not Found", { status: 404 });
  }
  const raceTemplateJson = JSON.parse(
    raceTemplateData.json
  ) as RaceTemplateJson;
  return json<LoaderData>({
    data: {
      title: raceTierListData.title,
      commennt: raceTierListData.comment,
      raceTierListJson,
      totalHorseNum: raceTemplateJson.totalHorseNum,
    },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const raceTemplateId = request.url.split("/").slice(-1)[0];

  const title = form.get("title");
  const comment = form.get("comment");
  const tierList = form.get("tierlist");
  if (
    tierList === null ||
    typeof title !== "string" ||
    typeof comment !== "string"
  ) {
    return json({}, 400);
  }
  const raceTierListJson = JSON.parse(tierList as string) as RaceTierListJson;
  const data = await createRaceTierList(
    raceTemplateId,
    raceTierListJson,
    comment,
    title
  );

  return redirect(`/races/tierlists/${data.id}`);
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

export default function TierListRoute() {
  const { data } = useLoaderData<LoaderData>();

  const [tierList, setTierList] = useState<RaceTierListJson>(
    data.raceTierListJson
  );

  const [windowReady, setWindowReady] = useState(false);

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
      <Form method="post">
        <Flex direction={"column"}>
          <input
            type="hidden"
            name="tierlist"
            value={JSON.stringify(tierList)}
          />
          <input
            type="hidden"
            name="tierlist"
            value={JSON.stringify(tierList)}
          />
          <input type="text" name="title" id="tetle" />
          <input type="text" name="comment" id="comment" />
          {/* <button type="submit">Add</button> */}
        </Flex>
      </Form>
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
                            horse={horse}
                            frameColor={getFrameColor(
                              horse.horseNum,
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
    </>
  );
}

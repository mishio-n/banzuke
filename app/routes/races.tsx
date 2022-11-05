import { Box, Flex, Text } from "@chakra-ui/react";
import { json, Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { Header } from "~/components/header";
import { RaceCard } from "~/components/raceCard";
import { getRaceTemplates } from "~/models/raceTemplate.server";

type LoaderData = {
  raceTemplates: {
    id: string;
    title: string;
  }[];
};

export const loader: LoaderFunction = async () => {
  const raceTemplates = await getRaceTemplates();
  if (raceTemplates.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({
    raceTemplates,
  });
};

export default function RacesRoute() {
  const { raceTemplates } = useLoaderData<LoaderData>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Header />
      <Flex direction={"row"} width={"100%"}>
        <Box>
          <RaceCard>
            <img src="/add.svg" alt="add" style={{ width: 24, height: 24 }} />
            <Link to={"/races/new"}>
              <Text fontWeight={700}>新しくレースを登録する</Text>
            </Link>
          </RaceCard>

          {raceTemplates.map((race) => (
            <Flex key={race.id}>
              <Flex direction={"row"}>
                <Link to={`/races/tierlists?template=${race.id}`}>
                  {race.title}
                </Link>
              </Flex>
            </Flex>
          ))}
        </Box>
        <Box
          height={"calc(100vh - 84px)"}
          width={"100%"}
          borderLeft={"2px dotted"}
          borderColor={"gray.500"}
        >
          <Outlet />
        </Box>
      </Flex>
    </div>
  );
}

import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { json, Link, LoaderFunction, Outlet, useLoaderData } from "remix";
import { Header } from "~/components/header";
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
          <Button>
            <Link to={"/races/new"}>新しくレースを登録する</Link>
          </Button>
          {raceTemplates.map((race, index) => (
            <React.Fragment key={`fragment-${race.id}`}>
              {index !== 0 && <Divider key={`divider-${race.id}`} />}
              <Flex key={race.id}>
                <Flex direction={"row"}>
                  <Link to={`/races/tierlists?template=${race.id}`}>
                    {race.title}
                  </Link>
                </Flex>
              </Flex>
            </React.Fragment>
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

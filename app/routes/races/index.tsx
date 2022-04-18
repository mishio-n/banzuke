import { Flex } from "@chakra-ui/react";
import { json, Link, LoaderFunction, useLoaderData } from "remix";
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

export default function RaceIndexRoute() {
  const { raceTemplates } = useLoaderData<LoaderData>();

  return (
    <>
      {raceTemplates.map((race) => (
        <Flex key={race.id}>
          <Link to={race.id}>{race.title}</Link>
        </Flex>
      ))}
    </>
  );
}

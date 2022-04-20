import { Flex } from "@chakra-ui/react";
import { json, Link, LoaderFunction, useLoaderData } from "remix";
import { getGenerations } from "~/models/horse.server";

type LoaderData = {
  generations: number[];
};

export const loader: LoaderFunction = async () => {
  const groupBy = await getGenerations();
  if (groupBy.length === 0) {
    return new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({
    generations: groupBy.map(({ birthyear }) => birthyear),
  });
};

export default function GenerationIndexRoute() {
  const { generations } = useLoaderData<LoaderData>();

  return (
    <>
      {generations.map((generation) => (
        <Flex key={generation}>
          <Link to={`${generation}`}>{generation}年生まれ</Link>
        </Flex>
      ))}
    </>
  );
}

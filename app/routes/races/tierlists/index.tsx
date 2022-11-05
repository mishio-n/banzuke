import { Flex } from "@chakra-ui/react";
import { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules";
import { Link } from "react-router-dom";
import { json, LoaderFunction, useCatch, useLoaderData } from "remix";
import { getRaceTierLists } from "~/models/raceTierList.server";

type LoaderData = {
  raceTierLists: Awaited<ReturnType<typeof getRaceTierLists>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const templateId = url.searchParams.get("template") ?? undefined;
  const raceTierLists = await getRaceTierLists(templateId);
  if (raceTierLists.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({
    raceTierLists,
  });
};

export default function TierListIndexRoute() {
  const { raceTierLists } = useLoaderData<LoaderData>();

  return (
    <>
      {raceTierLists.map((tierList) => (
        <Flex key={tierList.id}>
          <Link to={`/races/tierlists/${tierList.id}`}>{tierList.title}</Link>
        </Flex>
      ))}
    </>
  );
}

export const CatchBoundary: CatchBoundaryComponent = () => {
  const error = useCatch();
  if (error.status === 404) {
    return <p>予想が登録されていません</p>;
  }
  return <span>error</span>;
};

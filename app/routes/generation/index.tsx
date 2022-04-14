import { json, LoaderFunction, useLoaderData } from "remix";
import { getGenerationData, StoredHorse } from "~/models/generation.server";

export const loader: LoaderFunction = async () => {
  const data = await getGenerationData(2019, "MALE");
  return json<StoredHorse[]>(data);
};

export default function GenerationIndexRoute() {
  const data = useLoaderData<StoredHorse[]>();
}

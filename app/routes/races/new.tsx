import {
  ActionFunction,
  json,
  redirect,
  useActionData,
  useTransition,
} from "remix";
import { createRaceTemplate } from "~/models/raceTemplate.server";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    raceUrl: string | undefined;
    title: string | undefined;
  };
  fields?: {
    raceUrl: string;
    title: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const raceUrl = form.get("raceUrl");
  const title = form.get("title");
  if (typeof raceUrl !== "string" || typeof title !== "string") {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  const raceTemplateData = await createRaceTemplate(raceUrl, title);
  return redirect(`/races/${raceTemplateData.id}`);
};

export default function NewRaceRoute() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <div>
      <form method="post">
        <div>
          <label htmlFor="raceUrl">
            URL:
            <input
              type="text"
              id="raceUrl"
              name="raceUrl"
              placeholder="URLを入力してください。"
              minLength={1}
            />
          </label>
        </div>
        <div>
          <label htmlFor="title">
            タイトル:
            <input
              type="text"
              id="title"
              name="title"
              placeholder="タイトルを入力してください。"
              minLength={1}
            />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            追加
          </button>
        </div>
      </form>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}

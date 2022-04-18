import { Outlet } from "remix";
import { Header } from "~/components/header";

export default function RacesRoute() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Header />
      <Outlet />
    </div>
  );
}

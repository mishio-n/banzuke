import { Link } from "remix";
import { Header } from "~/components/header";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Header />
      <ul>
        <li>
          <Link to="/generation">
            <span>世代</span>
          </Link>
        </li>
        <li>
          <Link to="/races">
            <span>レース</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

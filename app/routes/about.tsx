import { Box } from "@chakra-ui/react";
import { Outlet } from "remix";
import { Header } from "~/components/header";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Header />
      <Box mx={5} p={5}>
        <Outlet />
      </Box>
    </div>
  );
}

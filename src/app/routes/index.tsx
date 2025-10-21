import { createFileRoute } from "@tanstack/react-router";
import Playlists from "../../pages/playlists-page";

export const Route = createFileRoute("/")({
  component: Playlists,
});

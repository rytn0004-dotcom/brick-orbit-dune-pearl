import { createFileRoute } from "@tanstack/react-router";
import { DefenseGame } from "@/components/defense-game";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <DefenseGame />;
}

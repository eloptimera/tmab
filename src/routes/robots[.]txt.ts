import { createFileRoute } from "@tanstack/react-router";
import { absolut } from "@/lib/foretag";
import { textSvar } from "@/lib/sidor";

// Alla sökmotorer och AI-assistenter får läsa hela sajten.
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        textSvar(
          ["User-agent: *", "Allow: /", "", `Sitemap: ${absolut("/sitemap.xml")}`, ""].join("\n"),
          "text/plain",
        ),
    },
  },
});

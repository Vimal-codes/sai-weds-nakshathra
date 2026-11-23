import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "@/components/WeddingInvitation";

export const Route = createFileRoute("/")({
  component: WeddingInvitation,
  head: () => ({
    meta: [
      { title: "Sai & Nakshathra — Wedding Invitation" },
      {
        name: "description",
        content:
          "Join Sai Nath and Dr. Nakshathra for their wedding celebration on 3 December 2026 at CAM Convention Center, Kayamkulam.",
      },
      { property: "og:title", content: "Sai & Nakshathra — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Together with our families, we invite you to celebrate with us on 3 December 2026.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://saiwedsnakshathra.in/" },
      {
        property: "og:image",
        content: "https://saiwedsnakshathra.in/wedding-preview-red.jpg",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://saiwedsnakshathra.in/wedding-preview-red.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://saiwedsnakshathra.in/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Sai Nath & Dr. Nakshathra — Wedding",
          startDate: "2026-12-03T10:30:00+05:30",
          endDate: "2026-12-03T11:20:00+05:30",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "CAM Convention Center",
            address: "Moonnamkutty, Kattachira, Kayamkulam, Kerala, India",
          },
        }),
      },
    ],
  }),
});

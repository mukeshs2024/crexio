import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Mock Auction Room",
  description: "Create a private multiplayer IPL mock auction room and share the invite code with your friends to start bidding.",
  alternates: {
    canonical: "/create",
  }
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

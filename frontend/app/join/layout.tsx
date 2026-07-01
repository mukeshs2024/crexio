import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Mock Auction Room",
  description: "Enter an invite code to join a private multiplayer IPL mock auction room and start bidding on your favorite players.",
  alternates: {
    canonical: "/join",
  }
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

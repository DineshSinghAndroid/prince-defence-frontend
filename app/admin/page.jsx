import { notFound } from "next/navigation";

export const metadata = {
  title: "Not Found | Prince Defence Academy",
  robots: { index: false, follow: false },
};

export default function PublicAdminRoute() {
  notFound();
}

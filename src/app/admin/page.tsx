import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ContentStudio from "@/components/admin/content-studio";
import { isLocalAdminRequest } from "@/lib/admin-access";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isLocalAdminRequest(await headers())) notFound();
  return <ContentStudio />;
}

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { isLocalAdminRequest } from "@/lib/admin-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isLocalAdminRequest(request.headers)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "misc").replace(/[^a-z0-9-]/gi, "");

  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return Response.json({ error: "Sélectionne un fichier image valide." }, { status: 400 });
  }

  const extension = path.extname(file.name).toLowerCase() || ".png";
  const baseName = path.basename(file.name, extension)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const fileName = `${baseName || "image"}-${Date.now()}${extension}`;
  const targetDirectory = path.join(process.cwd(), "public", "content", folder || "misc");

  await mkdir(targetDirectory, { recursive: true });
  await writeFile(path.join(targetDirectory, fileName), Buffer.from(await file.arrayBuffer()));

  return Response.json({ path: `/content/${folder || "misc"}/${fileName}` });
}

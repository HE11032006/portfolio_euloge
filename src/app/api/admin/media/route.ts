import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp, { type Metadata } from "sharp";
import { isLocalAdminRequest } from "@/lib/admin-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const WEBP_QUALITY = 100;

export async function POST(request: Request) {
  if (!isLocalAdminRequest(request.headers)) return Response.json({ error: "Not found" }, { status: 404 });
  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "misc").replace(/[^a-z0-9-]/gi, "") || "misc";

  if (!(file instanceof File) || !file.type.startsWith("image/")) return Response.json({ error: "Sélectionne un fichier image valide." }, { status: 400 });
  if (file.size > MAX_UPLOAD_BYTES) return Response.json({ error: "L’image dépasse la limite de 10 Mo." }, { status: 413 });

  const input = Buffer.from(await file.arrayBuffer());
  let metadata: Metadata;
  try { metadata = await sharp(input).metadata(); } catch { return Response.json({ error: "L’image est illisible ou invalide." }, { status: 400 }); }
  if (!metadata.width || !metadata.height) return Response.json({ error: "Les dimensions de l’image sont invalides." }, { status: 400 });

  const baseName = path.basename(file.name, path.extname(file.name)).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  const fileName = `${baseName || "image"}-${Date.now()}.webp`;
  const compressed = await sharp(input).webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();
  const output = compressed.length < input.length ? compressed : input;
  const outputName = output === compressed ? fileName : `${baseName || "image"}-${Date.now()}${path.extname(file.name).toLowerCase() || ".bin"}`;
  const targetDirectory = path.join(process.cwd(), "public", "content", folder);
  await mkdir(targetDirectory, { recursive: true });
  await writeFile(path.join(targetDirectory, outputName), output);

  return Response.json({ path: `/content/${folder}/${outputName}`, originalBytes: input.length, storedBytes: output.length, compressed: output === compressed, width: metadata.width, height: metadata.height });
}

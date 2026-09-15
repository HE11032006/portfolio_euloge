import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { isLocalAdminRequest } from "@/lib/admin-access";
import type { ContentCollection, ContentStore } from "@/lib/content-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const collections: ContentCollection[] = [
  "certifications",
  "projects",
  "blog-posts",
  "blog-categories",
];

function denied() {
  return Response.json({ error: "Not found" }, { status: 404 });
}

function adminEnabled(request: Request) {
  return isLocalAdminRequest(request.headers);
}

function fileFor(collection: ContentCollection) {
  return path.join(process.cwd(), "content", `${collection}.json`);
}

function isCollection(value: unknown): value is ContentCollection {
  return typeof value === "string" && collections.includes(value as ContentCollection);
}

async function readCollection(collection: ContentCollection): Promise<unknown[]> {
  const source = await readFile(fileFor(collection), "utf8");
  return JSON.parse(source) as unknown[];
}

async function saveCollection(collection: ContentCollection, items: unknown[]) {
  await writeFile(fileFor(collection), `${JSON.stringify(items, null, 2)}\n`, "utf8");
}

function keyOf(collection: ContentCollection, item: unknown) {
  if (collection === "blog-categories") return item;
  if (!item || typeof item !== "object") return undefined;
  return collection === "certifications"
    ? (item as { id?: unknown }).id
    : (item as { slug?: unknown }).slug;
}

function validate(collection: ContentCollection, item: unknown): string | null {
  if (collection === "blog-categories") {
    return typeof item === "string" && item.trim() ? null : "La catégorie est obligatoire.";
  }
  if (!item || typeof item !== "object") return "Contenu invalide.";

  const value = item as Record<string, unknown>;
  const required =
    collection === "certifications"
      ? ["id", "title", "subtitle", "logo", "kind", "points"]
      : collection === "projects"
        ? ["slug", "title", "shortDescription", "year", "category", "image", "problem", "solution", "audience", "resolution", "stack"]
        : ["slug", "title", "shortDescription", "coverImage", "category", "date", "readTime", "sections"];

  const missing = required.find((field) => {
    const fieldValue = value[field];
    return fieldValue === undefined || fieldValue === null || fieldValue === "";
  });
  if (missing) return `Le champ « ${missing} » est obligatoire.`;

  if (collection === "certifications") {
    if (!["certification", "specialization"].includes(String(value.kind))) {
      return "Le type de certification est invalide.";
    }
    if (!Array.isArray(value.points) || value.points.length !== 4 || value.points.some((point) => !String(point).trim())) {
      return "Une certification doit contenir exactement quatre points.";
    }
  }

  if (collection === "blog-posts" && (!Array.isArray(value.sections) || value.sections.length === 0)) {
    return "Un article doit contenir au moins une section.";
  }

  return null;
}

export async function GET(request: Request) {
  if (!adminEnabled(request)) return denied();

  const entries = await Promise.all(
    collections.map(async (collection) => [collection, await readCollection(collection)] as const),
  );
  return Response.json(Object.fromEntries(entries) as ContentStore);
}

export async function POST(request: Request) {
  if (!adminEnabled(request)) return denied();
  const body = await request.json() as { collection?: unknown; item?: unknown };
  if (!isCollection(body.collection)) return Response.json({ error: "Collection invalide." }, { status: 400 });

  const error = validate(body.collection, body.item);
  if (error) return Response.json({ error }, { status: 400 });

  const items = await readCollection(body.collection);
  const key = keyOf(body.collection, body.item);
  if (items.some((item) => keyOf(body.collection as ContentCollection, item) === key)) {
    return Response.json({ error: "Cet identifiant existe déjà." }, { status: 409 });
  }

  items.push(body.item);
  await saveCollection(body.collection, items);
  return Response.json({ ok: true, item: body.item }, { status: 201 });
}

export async function PUT(request: Request) {
  if (!adminEnabled(request)) return denied();
  const body = await request.json() as { collection?: unknown; key?: unknown; item?: unknown };
  if (!isCollection(body.collection)) return Response.json({ error: "Collection invalide." }, { status: 400 });

  const error = validate(body.collection, body.item);
  if (error) return Response.json({ error }, { status: 400 });

  const items = await readCollection(body.collection);
  const index = items.findIndex((item) => keyOf(body.collection as ContentCollection, item) === body.key);
  if (index < 0) return Response.json({ error: "Contenu introuvable." }, { status: 404 });

  items[index] = body.item;
  await saveCollection(body.collection, items);
  return Response.json({ ok: true, item: body.item });
}

export async function DELETE(request: Request) {
  if (!adminEnabled(request)) return denied();
  const body = await request.json() as { collection?: unknown; key?: unknown };
  if (!isCollection(body.collection)) return Response.json({ error: "Collection invalide." }, { status: 400 });

  const items = await readCollection(body.collection);
  const nextItems = items.filter((item) => keyOf(body.collection as ContentCollection, item) !== body.key);
  if (nextItems.length === items.length) return Response.json({ error: "Contenu introuvable." }, { status: 404 });

  await saveCollection(body.collection, nextItems);
  return Response.json({ ok: true });
}

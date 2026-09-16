import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { isLocalAdminRequest } from "@/lib/admin-access";
import type {
  BlogPost,
  Certification,
  ContentCollection,
  ContentStore,
  LocalizedText,
  Project,
} from "@/lib/content-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const collections: ContentCollection[] = ["certifications", "projects", "blog-posts", "blog-categories"];

type CollectionItem = Certification | Project | BlogPost | LocalizedText;
type ContentRequestBody = {
  collection: ContentCollection;
  key?: string;
  item: CollectionItem;
};

const denied = () => Response.json({ error: "Not found" }, { status: 404 });
const valid = (value: unknown): value is ContentCollection =>
  typeof value === "string" && collections.includes(value as ContentCollection);
const file = (collection: ContentCollection) => path.join(process.cwd(), "content", `${collection}.json`);

const read = async (collection: ContentCollection): Promise<CollectionItem[]> =>
  JSON.parse(await readFile(file(collection), "utf8")) as CollectionItem[];

const save = async (collection: ContentCollection, items: CollectionItem[]) =>
  writeFile(file(collection), `${JSON.stringify(items, null, 2)}\n`, "utf8");

const key = (collection: ContentCollection, item: CollectionItem) => {
  if (collection === "blog-categories") return localized(item).fr || String(item);
  if (collection === "certifications") return (item as Certification).id;
  return (item as Project | BlogPost).slug;
};

const localized = (value: unknown): LocalizedText =>
  typeof value === "object" && value && "fr" in value
    ? { fr: String((value as LocalizedText).fr || ""), en: String((value as LocalizedText).en || "") }
    : { fr: String(value ?? ""), en: String(value ?? "") };

function validate(collection: ContentCollection, item: CollectionItem) {
  if (collection === "blog-categories") return localized(item).fr.trim() ? null : "La catégorie française est obligatoire.";
  if (!item || typeof item !== "object") return "Contenu invalide.";

  const record = item as Record<string, unknown>;
  const required =
    collection === "certifications"
      ? ["id", "title", "subtitle", "logo", "kind", "points"]
      : collection === "projects"
        ? ["slug", "title", "shortDescription", "year", "category", "image", "problem", "solution", "audience", "resolution", "stack"]
        : ["slug", "title", "shortDescription", "coverImage", "category", "date", "readTime", "sections"];

  for (const field of required) {
    const value = record[field];
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && !value.trim()) ||
      (typeof value === "object" && !localized(value).fr.trim())
    ) {
      return `Le champ « ${field} » est obligatoire.`;
    }
  }

  if (collection === "certifications") {
    const points = record.points;
    if (
      !Array.isArray(points) ||
      points.length !== 4 ||
      points.some((point) => !localized(point).fr.trim())
    ) {
      return "Une certification doit contenir exactement quatre points.";
    }
  }

  if (collection === "blog-posts" && (!Array.isArray(record.sections) || !record.sections.length)) {
    return "Un article doit contenir au moins une section.";
  }

  return null;
}

export async function GET(request: Request) {
  if (!isLocalAdminRequest(request.headers)) return denied();
  const entries = await Promise.all(collections.map(async (collection) => [collection, await read(collection)] as const));
  return Response.json(Object.fromEntries(entries) as ContentStore);
}

export async function POST(request: Request) {
  if (!isLocalAdminRequest(request.headers)) return denied();
  const body = (await request.json()) as ContentRequestBody;
  if (!valid(body.collection)) return Response.json({ error: "Collection invalide." }, { status: 400 });

  const item = body.collection === "blog-categories" ? localized(body.item) : body.item;
  const error = validate(body.collection, item);
  if (error) return Response.json({ error }, { status: 400 });

  const items = await read(body.collection);
  if (items.some((entry) => key(body.collection, entry) === key(body.collection, item))) {
    return Response.json({ error: "Cet identifiant existe déjà." }, { status: 409 });
  }

  items.push(item);
  await save(body.collection, items);
  return Response.json({ ok: true, item }, { status: 201 });
}

export async function PUT(request: Request) {
  if (!isLocalAdminRequest(request.headers)) return denied();
  const body = (await request.json()) as ContentRequestBody;
  if (!valid(body.collection)) return Response.json({ error: "Collection invalide." }, { status: 400 });

  const item = body.collection === "blog-categories" ? localized(body.item) : body.item;
  const error = validate(body.collection, item);
  if (error) return Response.json({ error }, { status: 400 });

  const items = await read(body.collection);
  const index = items.findIndex((entry) => key(body.collection, entry) === body.key);
  if (index < 0) return Response.json({ error: "Contenu introuvable." }, { status: 404 });

  items[index] = item;
  await save(body.collection, items);
  return Response.json({ ok: true, item });
}

export async function DELETE(request: Request) {
  if (!isLocalAdminRequest(request.headers)) return denied();
  const body = (await request.json()) as Pick<ContentRequestBody, "collection" | "key">;
  if (!valid(body.collection)) return Response.json({ error: "Collection invalide." }, { status: 400 });

  const items = await read(body.collection);
  const next = items.filter((entry) => key(body.collection, entry) !== body.key);
  if (next.length === items.length) return Response.json({ error: "Contenu introuvable." }, { status: 404 });

  await save(body.collection, next);
  return Response.json({ ok: true });
}

"use client";

import { useEffect, useMemo, useState } from "react";
import type { BlogPost, ContentCollection, ContentStore } from "@/lib/content-types";

const labels: Record<ContentCollection, string> = {
  certifications: "Certifications",
  projects: "Projets",
  "blog-posts": "Articles",
  "blog-categories": "Catégories du blog",
};

type Draft = Record<string, unknown>;

const blankStore: ContentStore = {
  certifications: [],
  projects: [],
  "blog-posts": [],
  "blog-categories": [],
};

function emptyDraft(collection: ContentCollection): Draft {
  if (collection === "certifications") {
    return { id: "", title: "", subtitle: "", logo: "", kind: "certification", points: ["", "", "", ""], issuer: "", obtainedAt: "", certificateImage: "", verifyUrl: "", featured: false, containedCertificationIds: [], specializationId: "" };
  }
  if (collection === "projects") {
    return { slug: "", title: "", shortDescription: "", year: "", category: "", image: "", problem: "", solution: "", audience: "", resolution: "", stack: "", liveUrl: "", githubUrl: "" };
  }
  if (collection === "blog-posts") {
    return { slug: "", title: "", shortDescription: "", coverImage: "", category: "", date: "", readTime: "", sections: [{ heading: "", body: "", image: "" }] };
  }
  return { name: "" };
}

function itemKey(collection: ContentCollection, item: unknown) {
  if (collection === "blog-categories") return String(item);
  const record = item as Record<string, unknown>;
  return String(collection === "certifications" ? record.id : record.slug);
}

function itemTitle(collection: ContentCollection, item: unknown) {
  if (collection === "blog-categories") return String(item);
  return String((item as Record<string, unknown>).title || itemKey(collection, item));
}

function cleanDraft(collection: ContentCollection, draft: Draft): unknown {
  if (collection === "blog-categories") return String(draft.name || "").trim();
  const cleaned = { ...draft };
  for (const key of Object.keys(cleaned)) {
    if (cleaned[key] === "") delete cleaned[key];
    if (Array.isArray(cleaned[key]) && cleaned[key].length === 0) delete cleaned[key];
  }
  return cleaned;
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="admin-field">
      <span>{label}{required && " *"}</span>
      {textarea ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} rows={4} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} />
      )}
    </label>
  );
}

function MediaField({
  label,
  value,
  folder,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  folder: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("folder", folder);
    const response = await fetch("/api/admin/media", { method: "POST", body: data });
    const result = await response.json() as { path?: string; error?: string };
    setUploading(false);
    if (!response.ok || !result.path) throw new Error(result.error || "Import impossible.");
    onChange(result.path);
  };

  return (
    <div className="admin-field">
      <span>{label}{required && " *"}</span>
      <div className="admin-media-row">
        <input value={value} onChange={(event) => onChange(event.target.value)} required={required} placeholder="URL ou fichier local" />
        <label className="admin-file-button">
          {uploading ? "Import…" : "Choisir"}
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file).catch((error: Error) => window.alert(error.message));
            }}
          />
        </label>
      </div>
      {value && <img className="admin-media-preview" src={value} alt="" />}
    </div>
  );
}

export default function ContentStudio() {
  const [store, setStore] = useState<ContentStore>(blankStore);
  const [collection, setCollection] = useState<ContentCollection>("certifications");
  const [draft, setDraft] = useState<Draft>(() => emptyDraft("certifications"));
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [status, setStatus] = useState("Chargement…");
  const [saving, setSaving] = useState(false);

  const items = store[collection] as unknown[];
  const categories = useMemo(() => store["blog-categories"], [store]);
  const certifications = useMemo(() => store.certifications, [store]);

  const refresh = async () => {
    const response = await fetch("/api/admin/content", { cache: "no-store" });
    if (!response.ok) throw new Error("Le studio local n’est pas activé.");
    setStore(await response.json() as ContentStore);
    setStatus("");
  };

  useEffect(() => {
    void refresh().catch((error: Error) => setStatus(error.message));
  }, []);

  const update = (key: string, value: unknown) => setDraft((current) => ({ ...current, [key]: value }));

  const reset = (nextCollection = collection) => {
    setEditingKey(null);
    setDraft(emptyDraft(nextCollection));
  };

  const selectCollection = (nextCollection: ContentCollection) => {
    setCollection(nextCollection);
    reset(nextCollection);
  };

  const edit = (item: unknown) => {
    const key = itemKey(collection, item);
    setEditingKey(key);
    setDraft(collection === "blog-categories" ? { name: String(item) } : structuredClone(item as Draft));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (item: unknown) => {
    const key = itemKey(collection, item);
    if (!window.confirm(`Supprimer « ${itemTitle(collection, item)} » ?`)) return;
    const response = await fetch("/api/admin/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection, key }),
    });
    const result = await response.json() as { error?: string };
    if (!response.ok) return setStatus(result.error || "Suppression impossible.");
    await refresh();
    reset();
  };

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    const response = await fetch("/api/admin/content", {
      method: editingKey ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ collection, key: editingKey, item: cleanDraft(collection, draft) }),
    });
    const result = await response.json() as { error?: string };
    setSaving(false);
    if (!response.ok) return setStatus(result.error || "Enregistrement impossible.");
    await refresh();
    reset();
    setStatus("Enregistré.");
  };

  return (
    <main className="admin-studio">
      <header className="admin-studio__header">
        <div>
          <p>Portfolio local</p>
          <h1>Content Studio</h1>
        </div>
        <span>Les changements sont écrits dans le dossier content.</span>
      </header>

      <nav className="admin-tabs" aria-label="Types de contenu">
        {(Object.keys(labels) as ContentCollection[]).map((key) => (
          <button key={key} type="button" className={collection === key ? "is-active" : ""} onClick={() => selectCollection(key)}>
            {labels[key]} <span>{store[key].length}</span>
          </button>
        ))}
      </nav>

      <div className="admin-studio__grid">
        <form className="admin-form" onSubmit={save}>
          <div className="admin-form__title">
            <h2>{editingKey ? "Modifier" : "Ajouter"} · {labels[collection]}</h2>
            {editingKey && <button type="button" onClick={() => reset()}>Annuler</button>}
          </div>

          {collection === "certifications" && (
            <>
              <div className="admin-form__columns">
                <Field label="Identifiant" value={String(draft.id || "")} onChange={(value) => update("id", value)} required placeholder="aws-architect" />
                <label className="admin-field"><span>Type *</span><select value={String(draft.kind)} onChange={(event) => update("kind", event.target.value)}><option value="certification">Certification</option><option value="specialization">Spécialisation</option></select></label>
              </div>
              {draft.kind === "specialization" && (
                <fieldset className="admin-relations">
                  <legend>Certifications incluses (facultatif)</legend>
                  <p>Choisis les certifications existantes à afficher dans la colonne de droite.</p>
                  {certifications.filter((item) => item.kind === "certification" && item.id !== draft.id).length === 0 ? (
                    <span>Aucune certification simple à associer pour le moment.</span>
                  ) : certifications.filter((item) => item.kind === "certification" && item.id !== draft.id).map((item) => {
                    const selected = (draft.containedCertificationIds as string[] || []).includes(item.id);
                    return <label key={item.id} className="admin-relation-option"><input type="checkbox" checked={selected} onChange={(event) => update("containedCertificationIds", event.target.checked ? [...(draft.containedCertificationIds as string[] || []), item.id] : (draft.containedCertificationIds as string[] || []).filter((id) => id !== item.id))} /> <span>{item.title}</span></label>;
                  })}
                </fieldset>
              )}
              {draft.kind === "certification" && (
                <label className="admin-field">
                  <span>Spécialisation parente (facultatif)</span>
                  <select value={String(draft.specializationId || "")} onChange={(event) => update("specializationId", event.target.value)}>
                    <option value="">Aucune</option>
                    {certifications.filter((item) => item.kind === "specialization" && item.id !== draft.id).map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                  </select>
                </label>
              )}
              <Field label="Titre" value={String(draft.title || "")} onChange={(value) => update("title", value)} required />
              <Field label="Sous-titre" value={String(draft.subtitle || "")} onChange={(value) => update("subtitle", value)} required />
              <MediaField label="Logo" value={String(draft.logo || "")} folder="certifications" onChange={(value) => update("logo", value)} required />
              {(draft.points as string[]).map((point, index) => <Field key={index} label={`Texte coché ${index + 1}`} value={point} onChange={(value) => update("points", (draft.points as string[]).map((item, itemIndex) => itemIndex === index ? value : item))} required />)}
              <div className="admin-form__columns">
                <Field label="Émetteur" value={String(draft.issuer || "")} onChange={(value) => update("issuer", value)} />
                <Field label="Date d’obtention" value={String(draft.obtainedAt || "")} onChange={(value) => update("obtainedAt", value)} />
              </div>
              <MediaField label="Image du certificat" value={String(draft.certificateImage || "")} folder="certifications" onChange={(value) => update("certificateImage", value)} />
              <Field label="Lien de vérification" value={String(draft.verifyUrl || "")} onChange={(value) => update("verifyUrl", value)} />
              <label className="admin-check"><input type="checkbox" checked={Boolean(draft.featured)} onChange={(event) => update("featured", event.target.checked)} /> Carte mise en avant</label>
            </>
          )}

          {collection === "projects" && (
            <>
              <div className="admin-form__columns">
                <Field label="Slug" value={String(draft.slug || "")} onChange={(value) => update("slug", value)} required placeholder="mon-projet" />
                <Field label="Année" value={String(draft.year || "")} onChange={(value) => update("year", value)} required />
              </div>
              <Field label="Titre" value={String(draft.title || "")} onChange={(value) => update("title", value)} required />
              <Field label="Courte description" value={String(draft.shortDescription || "")} onChange={(value) => update("shortDescription", value)} textarea required />
              <Field label="Catégorie" value={String(draft.category || "")} onChange={(value) => update("category", value)} required />
              <MediaField label="Image" value={String(draft.image || "")} folder="projects" onChange={(value) => update("image", value)} required />
              <Field label="Problème" value={String(draft.problem || "")} onChange={(value) => update("problem", value)} textarea required />
              <Field label="Solution" value={String(draft.solution || "")} onChange={(value) => update("solution", value)} textarea required />
              <Field label="Pour qui" value={String(draft.audience || "")} onChange={(value) => update("audience", value)} textarea required />
              <Field label="Comment on le résout" value={String(draft.resolution || "")} onChange={(value) => update("resolution", value)} textarea required />
              <Field label="Stack" value={String(draft.stack || "")} onChange={(value) => update("stack", value)} textarea required />
              <div className="admin-form__columns">
                <Field label="Live demo (facultatif)" value={String(draft.liveUrl || "")} onChange={(value) => update("liveUrl", value)} />
                <Field label="GitHub (facultatif)" value={String(draft.githubUrl || "")} onChange={(value) => update("githubUrl", value)} />
              </div>
            </>
          )}

          {collection === "blog-posts" && (
            <>
              <div className="admin-form__columns">
                <Field label="Slug" value={String(draft.slug || "")} onChange={(value) => update("slug", value)} required placeholder="titre-de-l-article" />
                <Field label="Date" value={String(draft.date || "")} onChange={(value) => update("date", value)} required />
              </div>
              <Field label="Titre" value={String(draft.title || "")} onChange={(value) => update("title", value)} required />
              <Field label="Courte description" value={String(draft.shortDescription || "")} onChange={(value) => update("shortDescription", value)} textarea required />
              <div className="admin-form__columns">
                <label className="admin-field"><span>Catégorie *</span><select value={String(draft.category || "")} onChange={(event) => update("category", event.target.value)} required><option value="">Choisir</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
                <Field label="Temps de lecture" value={String(draft.readTime || "")} onChange={(value) => update("readTime", value)} required placeholder="6 min" />
              </div>
              <MediaField label="Image principale" value={String(draft.coverImage || "")} folder="blog" onChange={(value) => update("coverImage", value)} required />
              <div className="admin-sections">
                <div className="admin-form__title"><h3>Contenu de l’article</h3><button type="button" onClick={() => update("sections", [...(draft.sections as BlogPost["sections"]), { heading: "", body: "", image: "" }])}>Ajouter une section</button></div>
                {(draft.sections as BlogPost["sections"]).map((section, index) => (
                  <fieldset key={index}>
                    <legend>Section {index + 1}</legend>
                    <Field label="Titre (facultatif)" value={section.heading || ""} onChange={(value) => update("sections", (draft.sections as BlogPost["sections"]).map((item, itemIndex) => itemIndex === index ? { ...item, heading: value } : item))} />
                    <Field label="Texte" value={section.body} onChange={(value) => update("sections", (draft.sections as BlogPost["sections"]).map((item, itemIndex) => itemIndex === index ? { ...item, body: value } : item))} textarea required />
                    <MediaField label="Image (facultative)" value={section.image || ""} folder="blog" onChange={(value) => update("sections", (draft.sections as BlogPost["sections"]).map((item, itemIndex) => itemIndex === index ? { ...item, image: value } : item))} />
                    {(draft.sections as BlogPost["sections"]).length > 1 && <button type="button" className="admin-danger" onClick={() => update("sections", (draft.sections as BlogPost["sections"]).filter((_, itemIndex) => itemIndex !== index))}>Supprimer cette section</button>}
                  </fieldset>
                ))}
              </div>
            </>
          )}

          {collection === "blog-categories" && <Field label="Nom de la catégorie" value={String(draft.name || "")} onChange={(value) => update("name", value)} required />}

          <p className="admin-status" role="status">{status}</p>
          <button className="admin-submit" type="submit" disabled={saving}>{saving ? "Enregistrement…" : editingKey ? "Enregistrer les modifications" : "Ajouter"}</button>
        </form>

        <section className="admin-list">
          <h2>{labels[collection]}</h2>
          {items.length === 0 ? <p className="admin-empty">Aucun contenu pour le moment.</p> : items.map((item) => (
            <article key={itemKey(collection, item)}>
              <div><strong>{itemTitle(collection, item)}</strong><span>{itemKey(collection, item)}</span></div>
              <div><button type="button" onClick={() => edit(item)}>Modifier</button><button type="button" className="admin-danger" onClick={() => void remove(item)}>Supprimer</button></div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import type { BlogPost, ContentCollection, ContentStore, LocalizedText } from "@/lib/content-types";

const labels: Record<ContentCollection, string> = { certifications: "Certifications", projects: "Projets", "blog-posts": "Articles", "blog-categories": "Catégories du blog" };
type Draft = Record<string, any>;
const blankStore: ContentStore = { certifications: [], projects: [], "blog-posts": [], "blog-categories": [] };
const localizedValue = (value: any): LocalizedText => typeof value === "object" && value && "fr" in value ? { fr: String(value.fr || ""), en: String(value.en || "") } : { fr: String(value ?? ""), en: String(value ?? "") };
const emptyLocalized = (): LocalizedText => ({ fr: "", en: "" });

function emptyDraft(collection: ContentCollection): Draft {
  if (collection === "certifications") return { id: "", title: emptyLocalized(), subtitle: emptyLocalized(), logo: "", kind: "certification", points: [emptyLocalized(), emptyLocalized(), emptyLocalized(), emptyLocalized()], issuer: emptyLocalized(), obtainedAt: emptyLocalized(), certificateImage: "", verifyUrl: "", featured: false, cardTheme: "light", containedCertificationIds: [], specializationId: "" };
  if (collection === "projects") return { slug: "", title: emptyLocalized(), shortDescription: emptyLocalized(), year: "", category: emptyLocalized(), image: "", problem: emptyLocalized(), solution: emptyLocalized(), audience: emptyLocalized(), resolution: emptyLocalized(), stack: emptyLocalized(), liveUrl: "", githubUrl: "" };
  if (collection === "blog-posts") return { slug: "", title: emptyLocalized(), shortDescription: emptyLocalized(), coverImage: "", category: emptyLocalized(), date: emptyLocalized(), readTime: emptyLocalized(), sections: [{ heading: emptyLocalized(), body: emptyLocalized(), image: "" }] };
  return { name: emptyLocalized() };
}

function LocalizedField({ label, value, onChange, textarea = false, required = false, language }: { label: string; value: any; onChange: (value: LocalizedText) => void; textarea?: boolean; required?: boolean; language: "fr" | "en" }) {
  const current = localizedValue(value);
  const missingFrench = !current.fr.trim();
  const missingEnglish = !current.en.trim();
  const Input = textarea ? "textarea" : "input";
  return (
    <label className="admin-field">
      <span>
        {label}{required && " *"}
        <small className="admin-field__lang">{language.toUpperCase()}</small>
        {missingFrench && language === "fr" && <small className="admin-field__hint">obligatoire</small>}
        {!missingFrench && missingEnglish && language === "en" && <small className="admin-field__hint">facultatif · fallback FR sur le site</small>}
      </span>
      <Input
        value={current[language]}
        onChange={(event: any) => onChange({ ...current, [language]: event.target.value })}
        required={required && language === "fr"}
        rows={textarea ? 4 : undefined}
        placeholder={language === "en" ? "English version (optional)" : "Version française"}
      />
    </label>
  );
}

function PlainField({ label, value, onChange, required = false, placeholder, uploadFolder }: { label: string; value: any; onChange: (value: string) => void; required?: boolean; placeholder?: string; uploadFolder?: "blog" | "projects" | "certifications" }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isImage = /image|logo/i.test(label);
  const folder = uploadFolder || (/blog/i.test(label) ? "blog" : /projet|project/i.test(label) ? "projects" : "certifications");
  const upload = async (file: File) => {
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", folder);
      const response = await fetch("/api/admin/media", { method: "POST", body: data });
      const result = await response.json() as { path?: string; error?: string };
      if (!response.ok || !result.path) throw new Error(result.error || "Import impossible.");
      onChange(result.path);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  return (
    <div className="admin-field">
      <span>{label}{required && " *"}</span>
      <div className={isImage ? "admin-media-row" : undefined}>
        <input value={String(value ?? "")} onChange={(event) => onChange(event.target.value)} required={required} placeholder={placeholder} />
        {isImage && (
          <>
            <input ref={fileInputRef} className="admin-file-input" type="file" accept="image/*" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file).catch((error: Error) => window.alert(error.message)); }} />
            <button type="button" className="admin-file-button" disabled={uploading} onClick={() => fileInputRef.current?.click()}>{uploading ? "Compression…" : "Choisir"}</button>
          </>
        )}
      </div>
      {isImage && value && <img className="admin-media-preview" src={String(value)} alt="" />}
    </div>
  );
}

function previewText(value: any, language: "fr" | "en") {
  const text = localizedValue(value);
  return text[language] || text.fr || text.en || "—";
}

function DraftPreview({ collection, draft, language, onLanguageChange, onClose }: { collection: ContentCollection; draft: Draft; language: "fr" | "en"; onLanguageChange: (language: "fr" | "en") => void; onClose: () => void }) {
  if (collection === "blog-categories") return <div className="admin-preview-backdrop"><section className="admin-preview"><header><div><small>Prévisualisation · Catégorie</small><h2>{previewText(draft.name, language)}</h2></div><button type="button" onClick={onClose}>Fermer</button></header><div className="admin-preview__languages"><button type="button" className={language === "fr" ? "is-active" : ""} onClick={() => onLanguageChange("fr")}>FR</button><button type="button" className={language === "en" ? "is-active" : ""} onClick={() => onLanguageChange("en")}>EN</button></div></section></div>;
  const title = previewText(draft.title, language);
  return <div className="admin-preview-backdrop"><section className="admin-preview"><header><div><small>Prévisualisation · {labels[collection]}</small><h2>{title}</h2></div><button type="button" onClick={onClose}>Fermer</button></header><div className="admin-preview__languages"><button type="button" className={language === "fr" ? "is-active" : ""} onClick={() => onLanguageChange("fr")}>FR</button><button type="button" className={language === "en" ? "is-active" : ""} onClick={() => onLanguageChange("en")}>EN</button></div>{collection === "certifications" && <><p className="admin-preview__eyebrow">{draft.kind === "specialization" ? "Spécialisation" : "Certification"}</p><p className="admin-preview__lead">{previewText(draft.subtitle, language)}</p><ul>{(draft.points || []).map((point: LocalizedText, index: number) => <li key={index}>{previewText(point, language)}</li>)}</ul>{draft.issuer && <p><strong>Émetteur :</strong> {previewText(draft.issuer, language)}</p>}{draft.obtainedAt && <p><strong>Obtenue :</strong> {previewText(draft.obtainedAt, language)}</p>}</>}{collection === "projects" && <><p className="admin-preview__lead">{previewText(draft.shortDescription, language)}</p><p className="admin-preview__meta">{draft.year} · {previewText(draft.category, language)}</p>{[["Problème", draft.problem], ["Solution", draft.solution], ["Pour qui", draft.audience], ["Comment on le résout", draft.resolution], ["Stack", draft.stack]].map(([label, value]) => <section key={String(label)}><h3>{label}</h3><p>{previewText(value, language)}</p></section>)}</>}{collection === "blog-posts" && <><p className="admin-preview__meta">{previewText(draft.category, language)} · {previewText(draft.date, language)} · {previewText(draft.readTime, language)}</p><p className="admin-preview__lead">{previewText(draft.shortDescription, language)}</p>{(draft.sections || []).map((section: any, index: number) => <section key={index}><h3>{previewText(section.heading, language)}</h3><p>{previewText(section.body, language)}</p></section>)}</>}</section></div>;
}

export default function ContentStudio() {
  const [store, setStore] = useState<ContentStore>(blankStore);
  const [collection, setCollection] = useState<ContentCollection>("certifications");
  const [draft, setDraft] = useState<Draft>(() => emptyDraft("certifications"));
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [status, setStatus] = useState("Chargement…");
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLanguage, setPreviewLanguage] = useState<"fr" | "en">("fr");
  const [formLanguage, setFormLanguage] = useState<"fr" | "en">("fr");
  const items = store[collection] as unknown[];
  const certifications = store.certifications;

  const refresh = async () => { const response = await fetch("/api/admin/content", { cache: "no-store" }); if (!response.ok) throw new Error("Le studio local n’est pas activé."); setStore(await response.json() as ContentStore); setStatus(""); };
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch("/api/admin/content", { cache: "no-store" });
        if (!response.ok) throw new Error("Le studio local n’est pas activé.");
        const data = await response.json() as ContentStore;
        if (!cancelled) {
          setStore(data);
          setStatus("");
        }
      } catch (error) {
        if (!cancelled) setStatus((error as Error).message);
      }
    })();
    return () => { cancelled = true; };
  }, []);
  const update = (key: string, value: unknown) => setDraft((current) => ({ ...current, [key]: value }));
  const reset = (nextCollection = collection) => { setEditingKey(null); setPreviewOpen(false); setDraft(emptyDraft(nextCollection)); };
  const itemKey = (item: any) => collection === "blog-categories" ? localizedValue(item).fr : String(collection === "certifications" ? item.id : item.slug);
  const itemTitle = (item: any) => collection === "blog-categories" ? localizedValue(item).fr : localizedValue(item.title).fr || itemKey(item);
  const edit = (item: any) => { setEditingKey(itemKey(item)); setDraft(collection === "blog-categories" ? { name: localizedValue(item) } : JSON.parse(JSON.stringify(item))); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const remove = async (item: any) => { if (!window.confirm(`Supprimer « ${itemTitle(item)} » ?`)) return; const response = await fetch("/api/admin/content", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ collection, key: itemKey(item) }) }); if (!response.ok) { setStatus("Suppression impossible."); return; } await refresh(); reset(); };
  const save = async (event: React.FormEvent) => { event.preventDefault(); setSaving(true); setStatus(""); const item = collection === "blog-categories" ? draft.name : draft; const response = await fetch("/api/admin/content", { method: editingKey ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ collection, key: editingKey, item }) }); const result = await response.json() as { error?: string }; setSaving(false); if (!response.ok) { setStatus(result.error || "Enregistrement impossible."); return; } await refresh(); reset(); setStatus("Enregistré."); };
  const localizedFields = (fields: string[]) => fields.map((field) => <LocalizedField key={field} label={field} language={formLanguage} value={draft[field]} onChange={(value) => update(field, value)} required={!['issuer', 'obtainedAt'].includes(field)} />);

  return <main className="admin-studio"><header className="admin-studio__header"><div><p>Portfolio local</p><h1>Content Studio</h1></div><span>FR obligatoire · EN facultatif avec fallback français</span></header><nav className="admin-tabs" aria-label="Types de contenu">{(Object.keys(labels) as ContentCollection[]).map((key) => <button key={key} type="button" className={collection === key ? "is-active" : ""} onClick={() => { setCollection(key); reset(key); }}>{labels[key]} <span>{store[key].length}</span></button>)}</nav><div className="admin-studio__grid"><form className="admin-form" onSubmit={save}><div className="admin-form__title"><h2>{editingKey ? "Modifier" : "Ajouter"} · {labels[collection]}</h2><div className="admin-form__actions-inline"><div className="admin-form__language" aria-label="Langue du contenu"><span>Contenu</span><button type="button" className={formLanguage === "fr" ? "is-active" : ""} onClick={() => setFormLanguage("fr")}>FR</button><button type="button" className={formLanguage === "en" ? "is-active" : ""} onClick={() => setFormLanguage("en")}>EN</button></div>{editingKey && <button type="button" onClick={() => reset()}>Annuler</button>}</div></div><p className="admin-form__note">Les champs texte sont bilingues. Quand un visiteur passe en anglais sur le site, la version EN s’affiche. Si EN est vide, le français est utilisé.</p>

    {collection === "blog-categories" && <LocalizedField label="Nom de la catégorie" language={formLanguage} value={draft.name} onChange={(value) => update("name", value)} required />}

    {collection === "certifications" && <><div className="admin-form__columns"><PlainField label="Identifiant" value={draft.id} onChange={(value) => update("id", value)} required placeholder="aws-architect" /><label className="admin-field"><span>Type *</span><select value={draft.kind} onChange={(event) => update("kind", event.target.value)} required><option value="certification">Certification</option><option value="specialization">Spécialisation</option></select></label></div>{localizedFields(["title", "subtitle", "issuer", "obtainedAt"])}{(draft.points as LocalizedText[]).map((point, index) => <LocalizedField key={index} label={`Point clé ${index + 1}`} language={formLanguage} value={point} onChange={(value) => update("points", draft.points.map((item: LocalizedText, itemIndex: number) => itemIndex === index ? value : item))} required />)}{draft.kind === "specialization" && <fieldset className="admin-relations"><legend>Certifications incluses</legend><p>Sélectionne les certifications liées à cette spécialisation. Les relations utilisent les identifiants et restent identiques dans les deux langues.</p>{certifications.filter((item) => item.kind === "certification" && item.id !== draft.id).map((item) => { const selected = (draft.containedCertificationIds || []).includes(item.id); return <label key={item.id} className="admin-relation-option"><input type="checkbox" checked={selected} onChange={(event) => update("containedCertificationIds", event.target.checked ? [...(draft.containedCertificationIds || []), item.id] : (draft.containedCertificationIds || []).filter((id: string) => id !== item.id))} /><span>{localizedValue(item.title).fr || item.id}</span><small>{item.id}</small></label>; })}</fieldset>}{draft.kind === "certification" && <label className="admin-field"><span>Spécialisation parente (facultatif)</span><select value={draft.specializationId || ""} onChange={(event) => update("specializationId", event.target.value)}><option value="">Aucune</option>{certifications.filter((item) => item.kind === "specialization" && item.id !== draft.id).map((item) => <option key={item.id} value={item.id}>{localizedValue(item.title).fr || item.id}</option>)}</select></label>}<div className="admin-form__columns"><label className="admin-field"><span>Couleur de la carte *</span><select value={draft.cardTheme || "light"} onChange={(event) => update("cardTheme", event.target.value)} required><option value="light">Claire</option><option value="dark">Sombre</option></select></label><div /></div><PlainField label="Logo" value={draft.logo} onChange={(value) => update("logo", value)} required uploadFolder="certifications" /><PlainField label="Image du certificat" value={draft.certificateImage} onChange={(value) => update("certificateImage", value)} uploadFolder="certifications" /><PlainField label="Lien de vérification" value={draft.verifyUrl} onChange={(value) => update("verifyUrl", value)} /><label className="admin-check"><input type="checkbox" checked={Boolean(draft.featured)} onChange={(event) => update("featured", event.target.checked)} /> Afficher sur la page About</label><p className="admin-form__note">Au moins cinq certifications ou spécialisations doivent être sélectionnées pour la page About.</p></>}

    {collection === "projects" && <><div className="admin-form__columns"><PlainField label="Slug" value={draft.slug} onChange={(value) => update("slug", value)} required placeholder="mon-projet" /><PlainField label="Année" value={draft.year} onChange={(value) => update("year", value)} required /></div>{localizedFields(["title", "shortDescription", "category", "problem", "solution", "audience", "resolution", "stack"])}<PlainField label="Image" value={draft.image} onChange={(value) => update("image", value)} required uploadFolder="projects" /><PlainField label="Live demo (facultatif)" value={draft.liveUrl} onChange={(value) => update("liveUrl", value)} /><PlainField label="GitHub (facultatif)" value={draft.githubUrl} onChange={(value) => update("githubUrl", value)} /></>}

    {collection === "blog-posts" && <><div className="admin-form__columns"><PlainField label="Slug" value={draft.slug} onChange={(value) => update("slug", value)} required placeholder="titre-de-l-article" /><LocalizedField label="Date" language={formLanguage} value={draft.date} onChange={(value) => update("date", value)} required /></div>{localizedFields(["title", "shortDescription", "category", "readTime"])}<PlainField label="Image principale" value={draft.coverImage} onChange={(value) => update("coverImage", value)} required uploadFolder="blog" /><div className="admin-sections"><div className="admin-form__title"><h3>Sections de l’article</h3><button type="button" onClick={() => update("sections", [...draft.sections, { heading: emptyLocalized(), body: emptyLocalized(), image: "" }])}>Ajouter une section</button></div>{(draft.sections as BlogPost["sections"]).map((section, index) => <fieldset key={index}><legend>Section {index + 1}</legend><LocalizedField label="Titre (facultatif)" language={formLanguage} value={section.heading} onChange={(value) => update("sections", draft.sections.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, heading: value } : item))} /><LocalizedField label="Texte" language={formLanguage} value={section.body} onChange={(value) => update("sections", draft.sections.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, body: value } : item))} textarea required /><PlainField label="Image (facultative)" value={section.image} onChange={(value) => update("sections", draft.sections.map((item: any, itemIndex: number) => itemIndex === index ? { ...item, image: value } : item))} uploadFolder="blog" />{draft.sections.length > 1 && <button type="button" className="admin-danger" onClick={() => update("sections", draft.sections.filter((_: unknown, itemIndex: number) => itemIndex !== index))}>Supprimer cette section</button>}</fieldset>)}</div></>}

    <p className="admin-status" role="status">{status}</p><div className="admin-form__actions"><button type="button" className="admin-preview-button" onClick={() => setPreviewOpen(true)}>Prévisualiser</button><button className="admin-submit" type="submit" disabled={saving}>{saving ? "Enregistrement…" : editingKey ? "Enregistrer les modifications" : "Ajouter"}</button></div></form><section className="admin-list"><h2>{labels[collection]}</h2>{items.length === 0 ? <p className="admin-empty">Aucun contenu pour le moment.</p> : items.map((item: any) => <article key={itemKey(item)}><div><strong>{itemTitle(item)}</strong><span>{itemKey(item)}</span></div><div><button type="button" onClick={() => edit(item)}>Modifier</button><button type="button" className="admin-danger" onClick={() => void remove(item)}>Supprimer</button></div></article>)}</section></div>{previewOpen && <DraftPreview collection={collection} draft={draft} language={previewLanguage} onLanguageChange={setPreviewLanguage} onClose={() => setPreviewOpen(false)} />}</main>;
}

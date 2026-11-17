import type { ComponentType } from "react";
import { Boxes, ChartBar, CodeXml, Database, SearchCode, Sparkles, SquareTerminal, Workflow, Bot } from "lucide-react";
import {
  SiAndroidstudio, SiDocker, SiElectron, SiFastapi, SiFlutter, SiGit, SiGithub,
  SiGithubactions, SiHuggingface, SiJupyter, SiLangchain, SiLunacy, SiNumpy,
  SiOnnx, SiOpencv, SiOpencode, SiPandas, SiPostgresql, SiPython, SiRust,
  SiScikitlearn, SiShell, SiSqlite, SiSupabase, SiTypescript, SiVuedotjs, SiNextdotjs, SiYaml,
} from "react-icons/si";

type IconComponent = ComponentType<{ "aria-hidden"?: boolean | "true" | "false"; className?: string }>;

/** Associe des mots-clés (insensibles à la casse, testés avec `includes`) à une icône. */
const SKILL_ICONS: Array<[string[], IconComponent]> = [
  [["python"], SiPython],
  [["fastapi"], SiFastapi],
  [["elt", "etl"], Workflow],
  [["modélisation", "modeling"], Database],
  [["rag", "sémantique", "semantic"], SiLangchain],
  [["nlp", "langage naturel", "language processing"], SiHuggingface],
  [["classification", "opencv", "image"], SiOpencv],
  [["pandas"], SiPandas],
  [["numpy"], SiNumpy],
  [["scikit"], SiScikitlearn],
  [["seaborn"], ChartBar],
  [["bedrock"], Sparkles],
  [["postgresql", "postgres"], SiPostgresql],
  [["supabase"], SiSupabase],
  [["sqlite"], SiSqlite],
  [["docker"], SiDocker],
  [["typescript"], SiTypescript],
  [["next.js", "nextjs"], SiNextdotjs],
  [["vue"], SiVuedotjs],
  [["flutter"], SiFlutter],
  [["electron"], SiElectron],
  [["git"], SiGit],
  [["github actions"], SiGithubactions],
  [["ci/cd", "ci-cd"], SiGithub],
  [["analyse statique", "static analysis"], SearchCode],
  [["vs code", "visual studio code"], CodeXml],
  [["android studio"], SiAndroidstudio],
  [["jupyter"], SiJupyter],
  [["opencode"], SiOpencode],
  [["manus"], Bot],
  [["lunacy"], SiLunacy],
  [["rust"], SiRust],
  [["onnx"], SiOnnx],
  [["yaml"], SiYaml],
  [["shell", "bash"], SiShell],
  [["powershell"], SquareTerminal],
];

const FALLBACK_ICON = Boxes;

/** Retourne l'icône d'une technologie, ou une icône générique si inconnue. */
export function getSkillIcon(label: string): IconComponent {
  const key = label.toLowerCase();
  const match = SKILL_ICONS.find(([keywords]) => keywords.some((keyword) => key.includes(keyword)));
  return match ? match[1] : FALLBACK_ICON;
}

/** Liste " · " / ", " en chips icône + nom. */
export function parseSkillList(raw: string): string[] {
  return raw
    .split(/[·,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function SkillChip({ label }: { label: string }) {
  const Icon = getSkillIcon(label);
  return <li className="skill-chip"><Icon aria-hidden="true" /><span>{label}</span></li>;
}

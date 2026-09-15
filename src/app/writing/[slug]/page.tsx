import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShutterTitle } from "@/components/ui/shutter-title";
import type { BlogPost } from "@/lib/content-types";
import postData from "../../../../content/blog-posts.json";

const posts = postData as BlogPost[];

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <div className="surface-dark text-[#ececec] min-h-screen overflow-x-hidden">
      <div className="writing-article-layout page-start">
        <aside className="writing-article-back">
          <Link href="/writing" className="inline-flex">
            <HoverBorderGradient as="span" containerClassName="certs__gradient-btn" className="certs__gradient-content" duration={1.8}>
              <ArrowLeft aria-hidden="true" /><span>Retour</span>
            </HoverBorderGradient>
          </Link>
        </aside>

        <article className="w-full max-w-3xl pb-24">
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono tracking-wider uppercase mb-6 text-[#8e8e93]">
              <Link href="/writing" className="hover:text-white transition-colors">Blog</Link><span>/</span><span className="text-white">{post.category}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-[#f2f0ec] text-black font-mono font-bold text-[11px] px-2.5 py-1 tracking-wider uppercase rounded-sm">{post.category}</span>
              <span className="text-xs font-mono text-[#8e8e93] uppercase">{post.date}</span>
              <span className="text-xs font-mono text-[#8e8e93] uppercase">{post.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-[52px] font-black text-white leading-[1.05] tracking-tight mb-6 uppercase"><ShutterTitle text={post.title} /></h1>
            <p className="text-lg sm:text-xl text-neutral-400 font-light leading-relaxed">{post.shortDescription}</p>
          </header>

          <img src={post.coverImage} alt="" className="my-10 aspect-[16/9] w-full rounded-lg object-cover" />

          <section className="text-neutral-300 text-[16px] sm:text-[17px] leading-[1.75] space-y-10 max-w-[720px] mx-auto pt-6">
            {post.sections.map((section, index) => (
              <div key={`${section.heading || "section"}-${index}`}>
                {section.heading && <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 tracking-tight">{section.heading}</h2>}
                <p>{section.body}</p>
                {section.image && <img src={section.image} alt="" className="mt-6 w-full rounded-lg object-cover" />}
              </div>
            ))}
          </section>
        </article>
      </div>
    </div>
  );
}

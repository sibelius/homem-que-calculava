import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProblem, problems } from "@/lib/problems";
import { visualizations } from "@/components/viz";

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/problema/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = getProblem(slug);
  if (!found) return {};
  return { title: `${found.problem.title} — O Homem que Calculava`, description: found.problem.tagline };
}

export default async function ProblemPage({ params }: PageProps<"/problema/[slug]">) {
  const { slug } = await params;
  const found = getProblem(slug);
  if (!found) notFound();
  const { problem, index, prev, next } = found;
  const Viz = visualizations[problem.slug];

  return (
    <article className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/" className="text-sm text-muted hover:text-ink">
        ← Todos os problemas
      </Link>
      <div className="mt-6 font-mono text-xs text-gold">{String(index + 1).padStart(2, "0")}</div>
      <h1 className="font-display text-3xl sm:text-5xl">{problem.title}</h1>
      <p className="mt-2 text-lg text-muted">{problem.tagline}</p>

      <section className="mt-8 max-w-3xl space-y-3 text-[1.05rem] leading-relaxed">
        {problem.story.map((s) => (
          <p key={s}>{s}</p>
        ))}
      </section>

      <section className="mt-8">{Viz ? <Viz /> : null}</section>

      <section className="mt-8 max-w-3xl">
        <h2 className="font-display text-2xl">A matemática</h2>
        <div className="mt-3 space-y-3 leading-relaxed">
          {problem.math.map((s) => (
            <p key={s}>{s}</p>
          ))}
        </div>
      </section>

      <nav className="mt-12 flex justify-between gap-4 border-t border-line pt-6 text-sm">
        {prev ? (
          <Link href={`/problema/${prev.slug}`} className="hover:text-gold">
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/problema/${next.slug}`} className="text-right hover:text-gold">
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

import Link from "next/link";
import { problems } from "@/lib/problems";

export default function Home() {
  return (
    <div>
      <section className="pattern border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gold">Malba Tahan · 1938</p>
          <h1 className="font-display text-4xl leading-tight sm:text-6xl">
            O Homem que Calculava
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Beremiz Samir resolvia disputas, heranças e enigmas com aritmética. Aqui, cada problema do livro virou
            algo para mexer: arraste, toque e veja a conta fechar.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((p, i) => (
          <Link
            key={p.slug}
            href={`/problema/${p.slug}`}
            className="group rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:border-gold"
          >
            <div className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</div>
            <h2 className="mt-1 font-display text-xl group-hover:text-gold">{p.title}</h2>
            <p className="mt-2 text-sm text-muted">{p.tagline}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

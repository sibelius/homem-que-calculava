import { OG_SIZE, renderOg } from "@/lib/og";
import { problems } from "@/lib/problems";

export const alt = "Um problema de O Homem que Calculava, de Malba Tahan, visualizado";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderOg(`/problema/${slug}`);
}

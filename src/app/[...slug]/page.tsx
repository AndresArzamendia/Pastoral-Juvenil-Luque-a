import { redirect } from 'next/navigation';

// Map known legacy slugs to their SPA page keys
const SLUG_MAP: Record<string, string> = {
  nosotros:      'historia',
  historia:      'historia',
  estatuto:      'estatuto',
  institucional: 'institucional',
  zonas:         'zonas',
  zona1:         'zonas',
  zona2:         'zonas',
  zona3:         'zonas',
  zona4:         'zonas',
  consejo:       'consejo',
  agenda:        'agenda',
  noticias:      'noticias',
  faq:           'faq',
  contacto:      'contacto',
};

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const first = (slug?.[0] ?? '').toLowerCase();
  const page = SLUG_MAP[first] ?? 'home';
  redirect(`/?page=${page}`);
}

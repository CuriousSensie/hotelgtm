import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DetailPage } from '@/components/shared/detail-page';
import { getUseCase, useCases } from '@/content/use-cases';
import { buildMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () => useCases.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const useCase = getUseCase((await params).slug);
  return useCase ? buildMetadata(useCase) : {};
}

export default async function UseCasePage({ params }: Props) {
  const useCase = getUseCase((await params).slug);
  if (!useCase) notFound();
  return <DetailPage content={useCase} variant="audience" contactAudience={useCase.contactAudience} />;
}

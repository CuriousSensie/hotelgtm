import { DetailPage } from '@/components/shared/detail-page';
import { pipelineExecutionService as content } from '@/content/services';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata(content);

export default function Page() {
  return <DetailPage content={content} variant="service" />;
}

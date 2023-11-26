import HelpPage, {
  generateStaticParams as importedGenerateStaticParams,
} from '../../(home)/help/[path]/page';

export default async function Page({ params: { path } }) {
  return HelpPage({ params: { path } });
}
export async function generateStaticParams(): Promise<{ path: string }[]> {
  return importedGenerateStaticParams();
}

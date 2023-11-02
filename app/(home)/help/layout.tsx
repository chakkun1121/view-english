import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ヘルプページ',
  alternates: {
    canonical: '/help',
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <article className="w-full">{children}</article>;
}

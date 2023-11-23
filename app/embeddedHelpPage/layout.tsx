import { Metadata } from 'next';

export default function Layout({ children }) {
  return <div className="p-4">{children}</div>;
}
export const metadata: Metadata = {
  title: 'ヘルプ',
  robots: {
    index: false,
    follow: true,
  },
};

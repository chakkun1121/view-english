'use client';
import { getQuery } from '@/library/getQuery';
import MainContent from './mainContent';
export const mainColor="#7aa1d6";
export default function App() {
  const query = getQuery();
  console.log(query);
  return (
    <>
      <MainContent fileID={query?.fileID || null} type={query?.type || 'newTab'} />
    </>
  );
}

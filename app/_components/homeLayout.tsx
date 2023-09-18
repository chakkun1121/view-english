import Header from '../(home)/_components/header';
import Footer from '../(home)/_components/footer';
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="mb-36 mt-14 w-full px-6 flex-grow">
        <div className="max-w-container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-12">
          <main className="gap-22 col-span-full flex flex-col">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}

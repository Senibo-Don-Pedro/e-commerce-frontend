import { Header } from "@/components/header";

type ProductLayoutProps = {
  children: React.ReactNode;
};

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    // 1. Use a flex column layout
    // 2. Ensure it takes up the full screen height
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* 3. The 'children' will now grow to fill the remaining space */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}

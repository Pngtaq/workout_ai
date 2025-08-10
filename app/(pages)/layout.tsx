import Navigation from "@/components/ui/Navigation";

// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1">{children}</main>
    </div>
  );
}

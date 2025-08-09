import NavigationWrapper from "@/components/ui/NavigationWrapper";

// app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <NavigationWrapper />
      <main className="flex-1">{children}</main>
    </div>
  );
}

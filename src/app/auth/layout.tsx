export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f2937,_#020617_55%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="grid min-h-svh lg:grid-cols-2 bg-primary">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            className="flex items-center gap-2 font-medium font-monomaniac-one text-primary-foreground text-2xl"
            href="/"
          >
            <Image src="/logo.svg" alt="Silantik logo" width={24} height={24} />
            SILANTIK
          </Link>
        </div>
        {children}
      </div>
      <div className="relative hidden lg:block">
        <Image
          src="/auth.png"
          alt="Auth background"
          className="absolute inset-0 size-full object-cover"
          fill
          priority
          quality={100}
        />
      </div>
    </main>
  );
}

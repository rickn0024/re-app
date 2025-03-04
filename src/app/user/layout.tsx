import { APP_LOCATION, APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/shared/header/menu';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b container mx-auto">
          <div className="flex flex-between items-center h-16 px-4">
            <div className="flex-start">
              <Link href="/" className="flex flex-col items-center gap-[2px]">
                <Image
                  src="/images/logo.svg"
                  alt={`${APP_NAME} logo`}
                  width={90}
                  height={43}
                  priority={true}
                />
                <span className="text-xs -ml-1">
                  <span className="sr-only">{APP_NAME} </span>
                  <em>{APP_LOCATION}</em>
                </span>
              </Link>
              {/* USER NAV */}
            </div>
            <Menu />
          </div>
        </div>
        <div className="container mx-auto py-4">{children}</div>
      </div>
    </>
  );
}

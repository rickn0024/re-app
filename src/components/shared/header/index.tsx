import { APP_LOCATION, APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Menu from './menu';

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="wrapper md:p-2 md:px-10 flex-between">
        <div className="flex-start">
          <Link href="/" className="flex flex-col items-center gap-[2px]">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              width={90}
              height={43}
              priority={true}
            />
            <span className="text-xs">
              <span className="sr-only">{APP_NAME} </span>
              <em>{APP_LOCATION}</em>
            </span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
}

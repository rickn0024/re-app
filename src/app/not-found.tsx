'use client';

import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center bg-white">
        <Image
          src="/images/logo.svg"
          alt={`${APP_NAME} Logo`}
          width={100}
          height={100}
          className="mx-auto mb-1"
        />
        <p className="mb-4 text-xs">
          <em>Santa Clarita</em>
        </p>
        <h1 className="text-9xl font-black text-gray-200">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => (window.location.href = '/')}
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}

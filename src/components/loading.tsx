import loader from '@/assets/spinner.gif';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <Image src={loader} alt="Loading..." height="100" width="100" />
    </div>
  );
}

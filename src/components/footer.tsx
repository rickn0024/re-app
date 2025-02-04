import { APP_NAME } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t">
      <div className="p-5 flex-center">
        <p className="text-sm">
          &copy; {currentYear} | {APP_NAME} Homes | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

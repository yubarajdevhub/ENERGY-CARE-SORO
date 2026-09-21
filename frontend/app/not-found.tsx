import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <Leaf className="h-16 w-16 text-green-600 mb-6" />
      <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-700 mb-4">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mb-8">
        The page you are looking for doesn't exist, has been moved, or is currently under construction in this phase of development.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button className="bg-green-600 hover:bg-green-700">Go Home</Button>
        </Link>
        <Link href="/admin">
          <Button variant="outline">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}

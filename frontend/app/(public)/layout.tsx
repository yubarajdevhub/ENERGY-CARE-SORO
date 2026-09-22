import Link from "next/link";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-green-900">Energy Care</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600">Home</Link>
            <Link href="/about" className="text-sm font-medium hover:text-green-600">About</Link>
            <Link href="/products" className="text-sm font-medium hover:text-green-600">Products</Link>
            <Link href="/services" className="text-sm font-medium hover:text-green-600">Services</Link>
            <Link href="/reviews" className="text-sm font-medium hover:text-green-600">Reviews</Link>
            <Link href="/gallery" className="text-sm font-medium hover:text-green-600">Gallery</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-green-600">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-green-600 hidden md:block">Login</Link>
            <Link href="/quotation">
              <Button className="bg-green-600 hover:bg-green-700">
                Get a Quotation
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-slate-50 py-12 text-slate-600">
        <div className="container grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-green-900">Energy Care</span>
            </Link>
            <p className="text-sm">Clean Energy. Brighter Tomorrow.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-900">Quick Links</h3>
            <ul className="grid gap-2 text-sm">
              <li><Link href="/about" className="hover:text-green-600">About Us</Link></li>
              <li><Link href="/products" className="hover:text-green-600">Products</Link></li>
              <li><Link href="/services" className="hover:text-green-600">Services</Link></li>
              <li><Link href="/contact" className="hover:text-green-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-900">Contact</h3>
            <ul className="grid gap-2 text-sm">
              <li>123 Energy Park, Tech Area, New Delhi</li>
              <li>+91 98765 43210</li>
              <li>info@energycare.in</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-900">Legal</h3>
            <ul className="grid gap-2 text-sm">
              <li><Link href="#" className="hover:text-green-600">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-green-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mt-8 border-t pt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Energy Care. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

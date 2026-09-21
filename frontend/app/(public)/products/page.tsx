import Image from "next/image";
import Link from "next/link";
import { productRepo } from "@/lib/repositories";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ProductsPage() {
  const products = await productRepo.getAll();
  const activeProducts = products.filter(p => p.status === 'Active');

  return (
    <div className="container py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg text-slate-600">
          High-quality solar products for a sustainable future.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-slate-100 flex items-center justify-center p-6 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 text-xs font-semibold px-2 py-1 rounded shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
              <CardDescription className="line-clamp-2 min-h-10">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
              <p className="text-xl font-bold text-green-700">₹{product.price.toLocaleString('en-IN')}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 gap-2">
              <Link href={`/products/${product.id}`}><Button className="w-full" variant="outline" >View Details</Button></Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

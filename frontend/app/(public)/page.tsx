import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Leaf, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { productRepo, serviceRepo, bannerRepo, reviewRepo } from "@/lib/repositories";

export default async function Home() {
  const products = await productRepo.getAll();
  const services = await serviceRepo.getAll();
  const reviews = await reviewRepo.getAll();
  const banners = await bannerRepo.getAll();
  
  const activeBanners = banners.filter(b => b.status === 'Active').sort((a, b) => a.order - b.order);
  const featuredProducts = products.filter(p => p.status === 'Active').slice(0, 4);
  const activeServices = services.filter(s => s.status === 'Active').slice(0, 3);
  const activeReviews = reviews.filter(r => r.status === 'Active').slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="bg-green-50 py-20 lg:py-32">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900">
              Clean Energy for a <span className="text-green-600">Better Tomorrow</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-lg">
              Solar solutions, energy-efficient products and professional services for homes and businesses across India.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/quotation"><Button size="lg"  className="bg-green-600 hover:bg-green-700">Get a Quotation</Button></Link>
              <Link href="/products"><Button size="lg" variant="outline" >Explore Products</Button></Link>
            </div>
          </div>
          <div className="relative aspect-video lg:aspect-square bg-slate-200 rounded-2xl overflow-hidden flex items-center justify-center">
            <Image
              src={activeBanners[0]?.image ?? "/images/hero.png"}
              alt={activeBanners[0]?.title ?? "Clean energy home with solar panels and wind power"}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200 border-y py-10">
          <div className="flex flex-col items-center text-center gap-2">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <h3 className="text-3xl font-bold">1,000+</h3>
            <p className="text-sm text-slate-600">Happy Customers</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Zap className="h-8 w-8 text-green-600" />
            <h3 className="text-3xl font-bold">50+</h3>
            <p className="text-sm text-slate-600">Products</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Shield className="h-8 w-8 text-green-600" />
            <h3 className="text-3xl font-bold">8+</h3>
            <p className="text-sm text-slate-600">Years of Experience</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <h3 className="text-3xl font-bold">100%</h3>
            <p className="text-sm text-slate-600">Clean Energy Focus</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Our Featured Products</h2>
            <p className="text-slate-600">High-quality solar products for a sustainable future.</p>
          </div>
          <Link href="/products"><Button variant="ghost"  className="hidden md:flex">View All <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
        <Link href="/products"><Button variant="ghost"  className="md:hidden">View All <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
      </section>

      {/* Services */}
      <section className="bg-slate-50 py-20">
        <div className="container flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Our Services</h2>
              <p className="text-slate-600">Professional end-to-end solar solutions.</p>
            </div>
            <Link href="/services"><Button variant="ghost"  className="hidden md:flex">View All <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {activeServices.map(service => (
              <Card key={service.id} className="flex flex-col border-none shadow-md">
                <div className="h-48 bg-slate-200 flex items-center justify-center rounded-t-xl">
                  <span className="text-slate-500">Image: {service.name}</span>
                </div>
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <p className="font-semibold text-sm">Starting from ₹{service.startingPrice.toLocaleString('en-IN')}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/services/${service.id}`}><Button variant="outline" className="w-full" >Learn More</Button></Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Reviews */}
      {activeReviews.length > 0 && (
        <section className="container flex flex-col gap-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Customers Say</h2>
            <p className="text-slate-600">Don't just take our word for it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {activeReviews.map(review => (
              <Card key={review.id} className="bg-white">
                <CardHeader>
                  <div className="flex gap-1 mb-2 text-yellow-500">
                    {Array(5).fill(0).map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-300'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <CardTitle className="text-base">{review.customerName}</CardTitle>
                  <CardDescription>{new Date(review.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 italic">"{review.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container">
        <div className="bg-green-900 rounded-3xl p-10 md:p-20 text-center text-white flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-5xl font-bold max-w-3xl">Ready to switch to solar?</h2>
          <p className="text-green-100 max-w-2xl text-lg">Get a free consultation and quotation for your home or business today.</p>
          <Link href="/quotation"><Button size="lg" variant="secondary"  className="mt-4">Request Quotation</Button></Link>
        </div>
      </section>

    </div>
  );
}

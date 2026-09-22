"use client";

import { Leaf, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="container py-12 lg:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-slate-600">
          Have questions about our solar solutions? We're here to help. Reach out to our team.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">First Name</Label>
                <Input id="name" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+91 9876543210" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" required />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg">Send Message</Button>
          </form>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-50 border-none">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-700 shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Office Address</h3>
                <p className="text-slate-600">123 Energy Park, Tech Area<br />New Delhi, India 110001</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-50 border-none">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-700 shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Phone & WhatsApp</h3>
                <p className="text-slate-600">+91 98765 43210</p>
                <p className="text-slate-600">+91 98765 43211</p>
                <Button variant="link" className="p-0 h-auto mt-2 text-green-700">Chat on WhatsApp &rarr;</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-50 border-none">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-700 shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email</h3>
                <p className="text-slate-600">info@energycare.in</p>
                <p className="text-slate-600">support@energycare.in</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-50 border-none">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-700 shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                <p className="text-slate-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p className="text-slate-600">Sunday: Closed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="mt-16 bg-slate-200 w-full h-[400px] rounded-2xl flex flex-col items-center justify-center text-slate-500 shadow-inner">
         <MapPin className="h-12 w-12 mb-4 opacity-50" />
         <p className="font-medium text-lg">Interactive Map Placeholder</p>
         <p className="text-sm">Google Maps integration will be added here.</p>
      </div>
    </div>
  );
}

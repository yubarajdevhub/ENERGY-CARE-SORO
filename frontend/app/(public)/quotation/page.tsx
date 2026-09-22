"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { quotationRepo } from "@/lib/repositories";

const quotationSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().min(5, "Address is required"),
  productOrService: z.string().min(1, "Please select a product or service"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  requirement: z.string().min(10, "Please provide more details about your requirement"),
  preferredContactMethod: z.string().min(1, "Please select a contact method"),
  additionalMessage: z.string().optional(),
});

export default function QuotationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof quotationSchema>>({
    resolver: zodResolver(quotationSchema) as any,
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
      address: "",
      productOrService: "",
      quantity: 1,
      requirement: "",
      preferredContactMethod: "",
      additionalMessage: "",
    },
  });

  async function onSubmit(values: z.infer<typeof quotationSchema>) {
    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await quotationRepo.create(values);
      setSuccessId(res.quotationId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (successId) {
    return (
      <div className="container py-20 max-w-2xl text-center">
        <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Request Submitted Successfully</h1>
        <p className="text-xl text-slate-600 mb-8">
          Thank you for reaching out. We have received your quotation request.
        </p>
        <Card className="bg-slate-50 border-dashed">
          <CardContent className="pt-6">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-2">Your Request ID</p>
            <p className="text-3xl font-bold text-slate-900">{successId}</p>
          </CardContent>
        </Card>
        <p className="text-slate-500 mt-8">
          Our team will review your requirements and get back to you shortly via your preferred contact method.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-3xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Request a Quotation</h1>
        <p className="text-lg text-slate-600">
          Fill out the form below and our energy experts will provide a customized quotation for your needs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Details & Requirements</CardTitle>
          <CardDescription>All fields marked with * are required.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl><Input placeholder="+91 9876543210" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredContactMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Contact Method *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Phone">Phone Call</SelectItem>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Installation Address / Location *</FormLabel>
                    <FormControl><Textarea placeholder="Full address" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="productOrService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product / Service Interested In *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select product or service" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Solar Panels">Solar Panels</SelectItem>
                          <SelectItem value="Solar Inverter">Solar Inverter</SelectItem>
                          <SelectItem value="Solar Battery">Solar Battery</SelectItem>
                          <SelectItem value="Solar Water Heater">Solar Water Heater</SelectItem>
                          <SelectItem value="Complete Solar Installation">Complete Solar Installation</SelectItem>
                          <SelectItem value="Energy Audit">Energy Audit</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity / Capacity Needed *</FormLabel>
                      <FormControl><Input type="number" min="1" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="requirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Requirement *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Please describe your energy needs, current setup, and what you are looking to achieve..." className="min-h-32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" size="lg" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Submit Quotation Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

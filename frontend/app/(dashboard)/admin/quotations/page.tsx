"use client";

import { useState, useEffect } from "react";
import { Search, Eye, UserPlus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { quotationRepo } from "@/lib/repositories";
import { Quotation } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewQuote, setViewQuote] = useState<Quotation | null>(null);

  useEffect(() => {
    loadQuotations();
  }, []);

  const loadQuotations = async () => {
    const data = await quotationRepo.getAll();
    setQuotations(data.reverse()); // Show newest first
  };

  const filteredQuotations = quotations.filter(q => {
    const matchesSearch = q.customerName.toLowerCase().includes(search.toLowerCase()) || 
                          q.quotationId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Review': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const updated = await quotationRepo.update(id, { status: newStatus as any });
      setQuotations(quotations.map(q => q.id === id ? updated : q));
      if (viewQuote?.id === id) {
        setViewQuote(updated);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
        <p className="text-slate-500">Manage customer quotation requests</p>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search by ID or name..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v || 'all')}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Quotation Prepared">Quotation Prepared</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product/Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No quotations found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuotations.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium text-green-700">{quote.quotationId}</TableCell>
                    <TableCell>{new Date(quote.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{quote.customerName}</p>
                        <p className="text-xs text-slate-500">{quote.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{quote.productOrService}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(quote.status)}>
                        {quote.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setViewQuote(quote)}>
                        <Eye className="h-4 w-4 mr-2" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!viewQuote} onOpenChange={(open) => !open && setViewQuote(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quotation Request Details</DialogTitle>
            <DialogDescription>ID: {viewQuote?.quotationId}</DialogDescription>
          </DialogHeader>
          
          {viewQuote && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <p className="text-sm font-medium text-slate-500 mb-1">Customer Information</p>
                   <p className="font-semibold">{viewQuote.customerName}</p>
                   <p className="text-sm">{viewQuote.phone}</p>
                   <p className="text-sm">{viewQuote.email}</p>
                   <p className="text-sm mt-1">{viewQuote.address}</p>
                </div>
                <div>
                   <p className="text-sm font-medium text-slate-500 mb-1">Request Information</p>
                   <p><span className="font-semibold">Product:</span> {viewQuote.productOrService}</p>
                   <p><span className="font-semibold">Quantity:</span> {viewQuote.quantity}</p>
                   <p><span className="font-semibold">Date:</span> {new Date(viewQuote.date).toLocaleDateString()}</p>
                   <p><span className="font-semibold">Prefers:</span> {viewQuote.preferredContactMethod}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Requirement Description</p>
                <div className="bg-slate-50 p-3 rounded-md text-sm border">
                  {viewQuote.requirement}
                </div>
              </div>

              <div className="flex items-center gap-4 border-t pt-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-500 mb-2">Update Status</p>
                  <Select value={viewQuote.status} onValueChange={(v) => handleStatusUpdate(viewQuote.id, v || viewQuote.status)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Site Visit Required">Site Visit Required</SelectItem>
                      <SelectItem value="Quotation Prepared">Quotation Prepared</SelectItem>
                      <SelectItem value="Sent">Sent</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                   <p className="text-sm font-medium text-slate-500 mb-2">Assign Staff</p>
                   <Button variant="outline" className="w-full justify-start">
                     <UserPlus className="h-4 w-4 mr-2" /> 
                     {viewQuote.assignedStaffId ? "Rahul Sharma" : "Assign Staff"}
                   </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewQuote(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

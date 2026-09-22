"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Zap, FileText, IndianRupee, Target } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { leadRepo, quotationRepo, staffRepo, customerRepo } from "@/lib/repositories";
import { useEffect, useState } from "react";

const leadData = [
  { name: "Jan", leads: 40, converted: 24 },
  { name: "Feb", leads: 30, converted: 13 },
  { name: "Mar", leads: 20, converted: 98 },
  { name: "Apr", leads: 27, converted: 39 },
  { name: "May", leads: 18, converted: 48 },
  { name: "Jun", leads: 23, converted: 38 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ef4444'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStaff: 0,
    newLeads: 0,
    activeCustomers: 0,
    newQuotations: 0,
    quotationsInProgress: 0,
  });
  
  const [leadStatusDistribution, setLeadStatusDistribution] = useState<any[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      const staffs = await staffRepo.getAll();
      const leads = await leadRepo.getAll();
      const customers = await customerRepo.getAll();
      const quotes = await quotationRepo.getAll();

      setStats({
        totalStaff: staffs.length,
        newLeads: leads.filter(l => l.status === 'New').length,
        activeCustomers: customers.length,
        newQuotations: quotes.filter(q => q.status === 'New').length,
        quotationsInProgress: quotes.filter(q => q.status !== 'New' && q.status !== 'Closed' && q.status !== 'Rejected').length,
      });

      // Aggregate lead statuses
      const statuses = leads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setLeadStatusDistribution(Object.keys(statuses).map((key, index) => ({
        name: key,
        value: statuses[key]
      })));
    };
    loadStats();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStaff}</div>
            <p className="text-xs text-slate-500">Active employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Target className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newLeads}</div>
            <p className="text-xs text-slate-500">Requires follow-up</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Zap className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCustomers}</div>
            <p className="text-xs text-slate-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Quotations</CardTitle>
            <FileText className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newQuotations}</div>
            <p className="text-xs text-slate-500">Pending review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quotes in Progress</CardTitle>
            <FileText className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.quotationsInProgress}</div>
            <p className="text-xs text-slate-500">In negotiation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹ 15L</div>
            <p className="text-xs text-slate-500">Estimated this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Leads Overview</CardTitle>
            <CardDescription>New leads vs converted over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="New Leads" />
                  <Bar dataKey="converted" fill="#22c55e" radius={[4, 4, 0, 0]} name="Converted" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Lead Status Distribution</CardTitle>
            <CardDescription>Current status of all active leads</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] flex items-center justify-center">
               {leadStatusDistribution.length > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadStatusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {leadStatusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
               ) : (
                 <p className="text-slate-500">No data available</p>
               )}
             </div>
             <div className="flex flex-wrap gap-4 justify-center mt-4">
               {leadStatusDistribution.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span>{entry.name} ({entry.value})</span>
                  </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Target, PhoneCall, UserCircle, FileText, MapPin, CheckCircle2 } from "lucide-react";
import { leadRepo, quotationRepo, attendanceRepo, customerRepo } from "@/lib/repositories";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/services/auth";
import { Badge } from "@/components/ui/badge";

export default function StaffDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    assignedLeads: 0,
    pendingFollowUps: 0,
    activeCustomers: 0,
    newQuotations: 0,
    attendanceToday: 'Not Marked',
    locationStatus: 'Active'
  });

  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    
    const loadStats = async () => {
      const leads = await leadRepo.getAll();
      const customers = await customerRepo.getAll();
      const quotes = await quotationRepo.getAll();
      const attendances = await attendanceRepo.getAll();

      // Filter for this staff member (assuming staffId matches userId for mock purposes)
      // Actually we'd need to match staff.userId === user.id, but this is a mock.
      const assigned = leads.filter(l => l.assignedStaffId === 's1'); 
      const myCustomers = customers.filter(c => c.assignedStaffId === 's1');
      
      const today = new Date().toISOString().split('T')[0];
      const todayAttendance = attendances.find(a => a.staffId === 's1' && a.date === today);

      setStats({
        assignedLeads: assigned.length,
        pendingFollowUps: assigned.filter(l => l.status === 'Follow-up' || l.status === 'Contacted').length,
        activeCustomers: myCustomers.length,
        newQuotations: quotes.filter(q => q.assignedStaffId === 's1' && q.status === 'New').length,
        attendanceToday: todayAttendance ? `Checked In ${todayAttendance.checkIn}` : 'Not Checked In',
        locationStatus: 'Active'
      });

      setRecentLeads(assigned.slice(0, 5));
    };
    loadStats();
  }, [user]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here's your overview for today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-blue-50 border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">Today's Attendance</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              {stats.attendanceToday}
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Check Out</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Leads</CardTitle>
            <Target className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assignedLeads}</div>
            <p className="text-xs text-slate-500">Total active leads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Follow-ups</CardTitle>
            <PhoneCall className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingFollowUps}</div>
            <p className="text-xs text-orange-600/80">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest leads assigned to you.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map(lead => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border">
                  <div>
                    <p className="font-medium">{lead.customerName}</p>
                    <p className="text-xs text-slate-500">{lead.interestedProductOrService}</p>
                  </div>
                  <Badge variant="outline" className="bg-white">{lead.status}</Badge>
                </div>
              ))}
              {recentLeads.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">No recent leads.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for today.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
               <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                 <PhoneCall className="h-6 w-6 text-blue-500" />
                 <span>Log Follow-up</span>
               </Button>
               <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                 <Target className="h-6 w-6 text-green-500" />
                 <span>Update Lead</span>
               </Button>
               <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                 <FileText className="h-6 w-6 text-orange-500" />
                 <span>View Quotations</span>
               </Button>
               <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                 <MapPin className="h-6 w-6 text-red-500" />
                 <span>Share Location</span>
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

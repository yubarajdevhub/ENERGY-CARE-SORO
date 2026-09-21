"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Clock, CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { attendanceRepo } from "@/lib/repositories";
import { Attendance } from "@/lib/types";

export default function StaffAttendancePage() {
  const [history, setHistory] = useState<Attendance[]>([]);
  const [todayRecord, setTodayRecord] = useState<Attendance | null>(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    loadData();
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadData = async () => {
    const data = await attendanceRepo.getAll();
    const myData = data.filter(a => a.staffId === 's1'); // Mock staff filter
    setHistory(myData);
    
    const todayStr = new Date().toISOString().split('T')[0];
    const today = myData.find(a => a.date === todayStr);
    setTodayRecord(today || null);
  };

  const handleCheckIn = async () => {
    setIsCheckingIn(true);
    // Mock API call
    setTimeout(() => {
      const now = new Date();
      const newRecord: Attendance = {
        id: `a${Date.now()}`,
        staffId: 's1',
        date: now.toISOString().split('T')[0],
        checkIn: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'Present'
      };
      setTodayRecord(newRecord);
      setHistory([newRecord, ...history]);
      setIsCheckingIn(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-slate-500">Mark your daily attendance and view history</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center py-10 text-center">
           <div className="mb-4">
             <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Current Time</p>
             <p className="text-5xl font-bold text-slate-800 font-mono tracking-tight">{currentTime || "..."}</p>
             <p className="text-slate-500 mt-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
           </div>
           
           <div className="w-full max-w-xs mt-6">
             {todayRecord ? (
               <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col items-center gap-3">
                 <CheckCircle2 className="h-10 w-10 text-green-500" />
                 <div>
                   <p className="font-semibold text-green-900">Checked In Successfully</p>
                   <p className="text-sm text-green-700">at {todayRecord.checkIn}</p>
                 </div>
                 {!todayRecord.checkOut && (
                   <Button variant="outline" className="w-full mt-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                     Check Out
                   </Button>
                 )}
               </div>
             ) : (
               <Button 
                 size="lg" 
                 className="w-full h-16 text-lg bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
                 onClick={handleCheckIn}
                 disabled={isCheckingIn}
               >
                 <MapPin className="mr-2 h-5 w-5" /> 
                 {isCheckingIn ? "Recording Location..." : "Check In Now"}
               </Button>
             )}
           </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent History</CardTitle>
            <CardDescription>Your attendance records for the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {history.map((record) => (
                 <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                   <div className="flex items-center gap-4">
                     <div className="bg-slate-100 p-3 rounded-full text-slate-600">
                       <CalendarDays className="h-5 w-5" />
                     </div>
                     <div>
                       <p className="font-medium text-slate-900">{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                       <p className="text-sm text-slate-500 flex items-center gap-2">
                         <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> In: {record.checkIn}</span>
                         {record.checkOut && <span className="flex items-center gap-1">Out: {record.checkOut}</span>}
                       </p>
                     </div>
                   </div>
                   <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                     {record.status}
                   </div>
                 </div>
               ))}
               {history.length === 0 && (
                 <p className="text-center text-slate-500 py-8">No records found.</p>
               )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

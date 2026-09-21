"use client";

import { useAuth } from '@/lib/services/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function RoleGuard({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles: string[];
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (!allowedRoles.includes(user.role)) {
        // Redirect based on role if they are logged in but don't have access
        if (user.role === 'admin') router.push('/admin');
        else if (user.role === 'staff') router.push('/staff');
        else router.push('/');
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}

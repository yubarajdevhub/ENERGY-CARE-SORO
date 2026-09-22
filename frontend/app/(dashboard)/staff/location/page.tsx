"use client";

import { useState, useEffect } from "react";
import { MapPin, ShieldAlert, CheckCircle2, Navigation, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function StaffLocationPage() {
  const [permissionState, setPermissionState] = useState<"prompt" | "granted" | "denied" | "unsupported">("prompt");
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setPermissionState("unsupported");
    }
  }, []);

  const enableLocation = () => {
    if ("geolocation" in navigator) {
      setIsUpdating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissionState("granted");
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLastUpdated(new Date().toLocaleTimeString());
          setIsUpdating(false);
        },
        (error) => {
          console.error("Error getting location", error);
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionState("denied");
          }
          setIsUpdating(false);
        }
      );
    }
  };

  const disableLocation = () => {
    setPermissionState("prompt");
    setLocation(null);
    setLastUpdated(null);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Location Sharing</h1>
        <p className="text-slate-500">Manage your location sharing preferences</p>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <ShieldAlert className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Privacy Information</AlertTitle>
        <AlertDescription className="text-blue-700/80">
          Location data is currently simulated/local-only as a frontend demonstration and will be connected to the backend in a future phase.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Status
              {permissionState === 'granted' ? (
                <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                  Active
                </Badge>
              ) : permissionState === 'denied' ? (
                <Badge variant="destructive">Denied</Badge>
              ) : (
                <Badge variant="secondary">Inactive</Badge>
              )}
            </CardTitle>
            <CardDescription>
              Control whether the admin can see your current location during work hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {permissionState === 'granted' && location ? (
              <div className="bg-slate-50 p-4 rounded-lg border space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                     <Navigation className="h-5 w-5" />
                  </div>
                  <div>
                     <p className="text-sm font-medium text-slate-500">Coordinates</p>
                     <p className="font-mono text-sm">{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t pt-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                     <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                     <p className="text-sm font-medium text-slate-500">Last Updated</p>
                     <p className="text-sm">{lastUpdated}</p>
                  </div>
                </div>
              </div>
            ) : permissionState === 'denied' ? (
              <div className="flex flex-col items-center justify-center p-6 bg-red-50 text-red-800 rounded-lg border border-red-200 text-center gap-2">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <p className="font-medium">Permission Denied</p>
                <p className="text-sm">Please allow location access in your browser settings to share your location.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg border text-center gap-2">
                <MapPin className="h-8 w-8 text-slate-400" />
                <p className="font-medium text-slate-700">Location not shared</p>
                <p className="text-sm text-slate-500">Enable location to share your whereabouts with the office.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-3">
            {permissionState === 'granted' ? (
              <>
                <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={disableLocation}>
                  Disable
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={enableLocation} disabled={isUpdating}>
                  {isUpdating ? "Refreshing..." : "Refresh Now"}
                </Button>
              </>
            ) : (
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={enableLocation} disabled={isUpdating || permissionState === 'unsupported'}>
                {isUpdating ? "Requesting..." : "Enable Location"}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <div className="bg-slate-200 rounded-xl flex items-center justify-center min-h-[300px] overflow-hidden relative border shadow-inner">
           {permissionState === 'granted' ? (
             <div className="absolute inset-0 bg-blue-50 flex flex-col items-center justify-center text-blue-900/50">
               <MapPin className="h-16 w-16 mb-4 text-blue-400" />
               <p className="font-semibold text-lg">Map View Placeholder</p>
               <p className="text-sm max-w-[250px] text-center mt-2">
                 Map integration (Google Maps/Mapbox) will be implemented here in Phase 2.
               </p>
             </div>
           ) : (
             <div className="text-slate-400 flex flex-col items-center">
               <MapPin className="h-12 w-12 mb-2 opacity-50" />
               <span>Map unavailable</span>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { MapPin, Navigation, Car, Bus } from "lucide-react";

export default function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  // In a real implementation, this would use Leaflet or Google Maps
  // For now, we'll create a styled placeholder

  const churchLocation = {
    lat: 44.9778,
    lng: -93.2650,
    address: "123 Main Street, Minneapolis, MN 55401",
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${churchLocation.lat},${churchLocation.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full">
      {/* Map Container */}
      <div className="bg-secondary-100 rounded-lg overflow-hidden shadow-lg mb-6">
        <div
          ref={mapRef}
          className="w-full h-96 bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center relative"
        >
          <div className="text-center">
            <MapPin className="text-primary-700 mx-auto mb-4" size={64} />
            <p className="text-secondary-700 font-semibold text-lg">
              Minneapolis Community of Christ
            </p>
            <p className="text-secondary-600">{churchLocation.address}</p>
          </div>

          {/* Interactive Features Overlay */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-4 max-w-xs">
            <h3 className="font-semibold text-secondary-900 mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={handleGetDirections}
                className="w-full flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors text-sm"
              >
                <Navigation size={16} />
                <span>Get Directions</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 bg-secondary-100 text-secondary-700 rounded hover:bg-secondary-200 transition-colors text-sm">
                <Car size={16} />
                <span>Driving Directions</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 bg-secondary-100 text-secondary-700 rounded hover:bg-secondary-200 transition-colors text-sm">
                <Bus size={16} />
                <span>Transit Options</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-2">Parking</h3>
          <p className="text-sm text-secondary-600">
            Free parking available in our lot behind the building. Street parking also
            available.
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-2">Accessibility</h3>
          <p className="text-sm text-secondary-600">
            Fully accessible building with designated parking near the main entrance.
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md border border-secondary-200">
          <h3 className="font-semibold text-secondary-900 mb-2">Public Transit</h3>
          <p className="text-sm text-secondary-600">
            Bus routes 6 & 17. Green Line to Nicollet Mall station (2 blocks).
          </p>
        </div>
      </div>
    </div>
  );
}

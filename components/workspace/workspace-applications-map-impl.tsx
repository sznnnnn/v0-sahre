"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import { SchoolLogoMark } from "@/components/match/school-logo-mark";

export type WorkspaceMapPin = {
  schoolId: string;
  name: string;
  nameEn: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  programCount: number;
  logo?: string;
};

function FitBounds({ pins }: { pins: WorkspaceMapPin[] }) {
  const map = useMap();
  const sig = pins.map((p) => `${p.schoolId}:${p.lat}:${p.lng}`).join("|");

  useEffect(() => {
    const positions = pins.map((p) => [p.lat, p.lng] as [number, number]);
    if (positions.length === 0) return;
    if (positions.length === 1) {
      map.setView(positions[0], 4);
      return;
    }
    map.fitBounds(L.latLngBounds(positions), { padding: [40, 40], maxZoom: 8 });
  }, [map, sig, pins.length]);

  return null;
}

export function WorkspaceApplicationsMapImpl({
  pins,
  onSelectSchool,
  className,
}: {
  pins: WorkspaceMapPin[];
  onSelectSchool?: (schoolId: string) => void;
  /** 嵌入卡片等场景下可去掉外框、改圆角 */
  className?: string;
}) {
  const fallbackCenter: [number, number] = [20, 10];
  const center: [number, number] =
    pins.length === 1 ? [pins[0].lat, pins[0].lng] : fallbackCenter;

  return (
    <div
      className={cn(
        "aspect-square w-full max-w-[200px] overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      <MapContainer
        center={center}
        zoom={pins.length === 1 ? 4 : 2}
        className="isolate z-0 h-full w-full [&_.leaflet-control-attribution]:max-w-[min(100%,160px)] [&_.leaflet-control-attribution]:whitespace-normal [&_.leaflet-control-attribution]:text-[9px] [&_.leaflet-control-attribution]:leading-snug"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds pins={pins} />
        {pins.map((pin) => (
          <CircleMarker
            key={pin.schoolId}
            center={[pin.lat, pin.lng]}
            radius={Math.min(8 + pin.programCount * 2, 18)}
            pathOptions={{
              color: "#0f766e",
              fillColor: "#14b8a6",
              fillOpacity: 0.78,
              weight: 2,
            }}
          >
            <Popup>
              <div className="min-w-[160px] space-y-1">
                <div className="flex items-start gap-2">
                  <SchoolLogoMark
                    school={{ name: pin.name, nameEn: pin.nameEn, logo: pin.logo }}
                    size="row"
                    rounded="md"
                  />
                  <p className="text-sm font-semibold leading-tight text-neutral-900">{pin.name}</p>
                </div>
                <p className="text-xs text-neutral-600">{pin.nameEn}</p>
                <p className="text-xs text-neutral-600">
                  {pin.city} · {pin.country}
                </p>
                <p className="text-xs tabular-nums text-neutral-800">{pin.programCount} 个项目</p>
                {onSelectSchool ? (
                  <button
                    type="button"
                    className="mt-2 w-full rounded-md bg-teal-700 px-2 py-1.5 text-xs font-medium text-white hover:bg-teal-800"
                    onClick={() => onSelectSchool(pin.schoolId)}
                  >
                    查看该校
                  </button>
                ) : null}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

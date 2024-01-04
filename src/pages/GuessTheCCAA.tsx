import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { coordenadas } from "../ccaa";
import * as turf from "@turf/turf";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Position {
  lat: number;
  lng: number;
}

const GuessTheCCAA = () => {
  const [markerPosition, setMarkerPosition] = useState<Position | null>(null);

  return (
    <div>
      <MapContainer center={[40.4166, -3.70384]} zoom={6}>
        <ClickHandler setMarkerPosition={setMarkerPosition} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerPosition && (
          <Marker position={[markerPosition.lat, markerPosition.lng]} />
        )}
      </MapContainer>
    </div>
  );
};

function ClickHandler({
  setMarkerPosition,
}: {
  setMarkerPosition: (latLng: Position) => void;
}) {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      const puntoLeaflet = turf.point([e.latlng.lng, e.latlng.lat]);

      const poligono = turf.polygon([
        [
          ...coordenadas,
          coordenadas[0], // Cierra el polígono volviendo al primer punto
        ],
      ]);

      const estaDentro = turf.inside(puntoLeaflet, poligono);

      if (estaDentro) {
        toast.success("Respuesta correcta 😁");
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        toast.error("Respuesta incorrecta 😢");
      }
      setMarkerPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default GuessTheCCAA;

import { useState, useEffect, FC } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import LocationIcon from '../icons/location-icon';
import L from 'leaflet';

const locationIcon = L.icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconSize: [38, 38], // size of the icon
});

interface Coords {
    lat: number;
    lng: number;
}

interface ChangeViewProps {
    coords: Coords;
}

export const ChangeView: FC<ChangeViewProps> = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 12);
    return null;
}

interface MapProps {
    features: IFeature[];
}

export default function Map({ features }: MapProps) {
    const [geoData, setGeoData] = useState<Coords>({ lat: 21.028511, lng: 105.804817 });

    const center: Coords = { lat: geoData.lat, lng: geoData.lng };

    if (features[0]) {
        console.log(features[0].geometry.coordinates);
    }

    return (
        <MapContainer
            center={center}
            zoom={12}
            style={{ height: '70vh' }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoData.lat && geoData.lng && (
                <Marker position={center} />
            )}
            {features.map((feature, index) => (
                <Marker
                    key={index}
                    position={{ lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] }}
                    icon={locationIcon}
                />
            ))}
            <ChangeView coords={center} />
        </MapContainer>
    );
}
import React, { useState, useEffect, FC, RefObject, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, GeoJSON, Polyline } from 'react-leaflet';
import L from 'leaflet';
import polyline from 'polyline';

const locationIcon = L.icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconSize: [38, 38],
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
    useEffect(() => {
        map.setView(coords);
    }, [coords, map]);
    return null;
}

interface MapProps {
    autoCompletePoint: IFeature | null;
    pickupPoints: IPickupPointTable[];
    manipulatePickupPointsDirections: IDirectionsGetResponse | undefined;
    enableClickMap: boolean;
    manipulatePickupPoints: IPickupPoint[];
    setManipulatePickupPoints: React.Dispatch<React.SetStateAction<IPickupPoint[]>>;
}

interface ClickMapComponentProps {
    geoData: Coords;
    setGeoData: React.Dispatch<React.SetStateAction<Coords>>;
}

const ClickMapComponent: React.FC<ClickMapComponentProps> = ({ geoData, setGeoData }) => {
    useMapEvents({
        click: (e) => {
            console.log('location clicked:', e.latlng);
            setGeoData(e.latlng);
        },
    });

    return null;
}

function MapEvents() {
    const map = useMapEvents({
        zoomend: () => {
            const zoom = map.getZoom();
            map.flyTo(map.getCenter(), zoom);
        },
    });

    return null;
}

export default function MapAdmin({ autoCompletePoint, pickupPoints, manipulatePickupPointsDirections, enableClickMap, manipulatePickupPoints, setManipulatePickupPoints }: MapProps) {
    const zoomRef = useRef<number>(12);
    const [geoData, setGeoData] = useState<Coords>({ lat: 21.028511, lng: 105.804817 });

    const center: Coords = { lat: geoData.lat, lng: geoData.lng };

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
                <Marker position={center} icon={locationIcon} />
            )}

            {/* pickup points */}
            {pickupPoints?.map((pickupPointTable, index) => (
                <Marker
                    key={index}
                    position={{ lat: pickupPointTable.pickupPoint.latitude, lng: pickupPointTable.pickupPoint.longitude }} //todo: add detail onclick later when having enough data from client flow
                    icon={locationIcon}
                    eventHandlers={{
                        click: () => {
                            if (manipulatePickupPoints.some(pickupPoint => pickupPoint.id === pickupPointTable.pickupPoint.id)) {
                                const index = manipulatePickupPoints.findIndex(pickupPoint => pickupPoint.id === pickupPointTable.pickupPoint.id);
                                setManipulatePickupPoints(manipulatePickupPoints.slice(0, index + 1));
                            } else {
                                setManipulatePickupPoints([...manipulatePickupPoints, pickupPointTable.pickupPoint]);
                            }
                        }
                    }}
                />
            ))}

            {/* autoComplete point */}
            {autoCompletePoint && (
                <Marker
                    key={autoCompletePoint.properties.id}
                    position={{ lat: autoCompletePoint.geometry.coordinates[1], lng: autoCompletePoint.geometry.coordinates[0] }}
                    icon={locationIcon}
                />
            )}

            <ChangeView coords={center} />

            {enableClickMap && <ClickMapComponent geoData={geoData} setGeoData={setGeoData} />}

            {manipulatePickupPointsDirections?.routes.map((route, routeIndex) => {
                const decodedPolyline = polyline.decode(route.geometry).map((coordinate: number[]) => [coordinate[0], coordinate[1]]);

                return (
                    <Polyline
                        key={`route-${routeIndex}`}
                        positions={decodedPolyline}
                        color="#910322"
                        weight={6}
                    />
                );
            })}

            <MapEvents />
        </MapContainer>
    );
}
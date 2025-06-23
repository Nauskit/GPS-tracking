
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

//Icon
const carIcon = new Leaflet.Icon({
    iconUrl: '../src/assets/delivery.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

export default function MapPage() {
    const position = [13.7563, 100.5018];

    return (
        <div className="h-screen w-full">
            <h1 className='text-xl mb-3 text-center'>GPS Tracking</h1>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-full w-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />
                <Marker position={position} icon={carIcon}>
                    <Popup>
                        You're Here! <br /> (Latitude: {position[0]}, Longitude: {position[1]})
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

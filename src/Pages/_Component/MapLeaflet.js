import React from "react";

import { 
    Map,
    MapContainer, 
    TileLayer, 
    Marker, 
    Popup, 
    Polygon,
    useMap 
} from 'react-leaflet';
import L from "leaflet";

import { useCachedData } from "../../_services";

export const MapLeaflet = ({lat = 110.369672, long = -7.796259, markerPopUp}) => {

    const cachedData = useCachedData(["borderLine"]);

    const borderLine = cachedData?.data?.coordinates;
    console.log(borderLine);

    const fillBlueOptions = { fillColor: 'blue' }

    const customMarker = new L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [13, 0]
    });

    return (
        <div className="map-container">
            <MapContainer style={{ height: "100%" }} center={[-7.835361534999942, 110.27838555500006]} zoom={13}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-7.835361534999942, 110.27838555500006]} icon={customMarker}>
                    <Popup>
                        {markerPopUp}
                    </Popup>
                </Marker>
                {/* <Polygon pathOptions={fillBlueOptions} positions={borderLine} /> */}
            </MapContainer>
        </div>
    );
};
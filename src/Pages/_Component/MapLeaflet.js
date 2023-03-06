import React, { useMemo, useRef, useState, useEffect } from "react";

import { 
    Map,
    MapContainer, 
    TileLayer, 
    Marker, 
    Popup, 
    Polygon,
    Rectangle,
    Tooltip,
    Polyline,
    Pane,
    useMap,
    useMapEvent,
} from 'react-leaflet';
import L from "leaflet";

import { useCachedData } from "../../_services";

const MovingMarker = ({position, setPosition}) => {
    const markerRef = useRef(null);

    const customMarker = new L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [17, 46]
    });

    useMapEvent('click', (e) => {
        // console.log("click");
        setPosition(e.latlng);
    });

    useEffect(() => {

    }, [position]);

    return (
        <Marker
            ref={markerRef}
            position={position}
            icon={customMarker}
        >
        </Marker>
    );
};

export const MapLeaflet = ({position, setPosition}) => {

    const cachedData = useCachedData(["borderLine"]);

    return (
        <div className="map-container">
            {
                cachedData?.data !== undefined &&
                <MapContainer 
                    bounds={cachedData?.data?.bounds}
                    style={{ height: "100%" }}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    <Pane name="blue-polyline" >
                        <Polygon positions={cachedData?.data?.coordinatesData} pathOptions={{ color: '#3388ff' }} />
                    </Pane>
                    <MovingMarker 
                        position={position}
                        setPosition={setPosition}
                    />
                </MapContainer>
            }
        </div>
    );
};
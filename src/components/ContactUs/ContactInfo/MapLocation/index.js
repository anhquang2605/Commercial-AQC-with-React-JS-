import React from 'react';
import GoogleMapReact from 'google-map-react';
import './map-location.scss';
import Marker from './Marker';
const MapLocation = (props) => {
     
    const DEFAULT_SETTING = {
        center: {
            lat: 37.279578607813065,
            lng: -121.84474515431567
        },
        zoom: 15
    }
    return (
        <div className="map-location">
            <GoogleMapReact 
                bootstrapURLKeys={{key: "AIzaSyDpJD6lmQLOD1o5CF5rODfgoVceX4LBEbY"}}
                defaultCenter={props.center? props.center : DEFAULT_SETTING.center}
                defaultZoom={props.zoome? props.zoom: DEFAULT_SETTING.zoom}
                mapId="bb6ae9d7f87cffe1"
                options={{
                    mapId: "bb6ae9d7f87cffe1"
                }}
            >
                <Marker lat={DEFAULT_SETTING.center.lat} lng={DEFAULT_SETTING.center.lng}></Marker>
            </GoogleMapReact>
        </div>
    );
}

export default MapLocation;

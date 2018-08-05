import React from 'react';
import './LocalMap.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const localMap = withScriptjs(withGoogleMap((props) => {
    const markers = props.markers.map(marker => {
        return (
            <Marker
                id={marker.id}
                key={marker.id}
                title={marker.title}
                position={marker.position}
                onClick={() => {props.markerClicked(marker.id);}}>
            </Marker>
        )
    });
    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 61.498, lng: 23.76 }}>
            {markers}
            { props.showInfoWindow && <InfoWindow position={{ lat: 61.498, lng: 23.76 }}>Tadaa!</InfoWindow> }
        </GoogleMap>
    );
}));

export default localMap
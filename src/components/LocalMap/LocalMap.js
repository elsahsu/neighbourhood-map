import React from 'react';
import './LocalMap.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const localMap = withScriptjs(withGoogleMap((props) => {
    // console.log('ShowInfoId:', props.showInfoId);
    const markers = props.markers.map(marker => {
        let infoWindow = null;
        if (props.showInfoId === marker.id) {
            infoWindow = <InfoWindow><p>{marker.description}</p></InfoWindow>
        }
        return (
            <Marker
                id={marker.id}
                key={marker.id}
                title={marker.title}
                position={marker.position}
                onClick={() => {props.markerClicked(marker.id);}}>
                {infoWindow}
            </Marker>
        );
    });
    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={{ lat: 61.498, lng: 23.76 }}>
            {markers}
        </GoogleMap>
    );
}));

export default localMap
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const localMap = withScriptjs(withGoogleMap((props) => {
    const markers = props.markers.map(marker => 
        <Marker id={marker.id} key={marker.id} title={marker.title} position={marker.position}/>
    )
    return (
        <div id="map">
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: 61.498, lng: 23.76 }}>
                {markers}
            </GoogleMap>
        </div>
    );
}));

export default localMap
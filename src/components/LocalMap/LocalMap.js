import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const localMap = withScriptjs(withGoogleMap((props) => {
    return (
        <div id="map">
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{ lat: 61.5, lng: 23.75 }} />
        </div>
    );
}));

export default localMap
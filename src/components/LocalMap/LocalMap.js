import React from 'react';
import './LocalMap.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const localMap = withScriptjs(withGoogleMap((props) => {
    // console.log('ShowInfoId:', props.showInfoId);
    const markers = props.markers.map(marker => {
        let infoWindow = null;
        if (props.showInfoId === marker.id) {
            console.log(marker.contact_info);
            let tripAdvisorLine = null;
            if (marker.trip_advisor.length > 10) {
                tripAdvisorLine = <li>TripAdvisor: <a href={marker.trip_advisor}>{marker.trip_advisor}</a></li>
            } else {
                tripAdvisorLine = <li>TripAdvisor ID: {marker.trip_advisor}</li>
            }
            infoWindow = (
                <InfoWindow className="InfoWindow">
                    <div>
                        <a href={marker.image.src}>
                            <img
                                src={marker.image.src}
                                alt={marker.image.title}
                                title={marker.image.title}
                                width="300px" />
                        </a>
                        <div dangerouslySetInnerHTML={{__html: marker.description}}></div>
                        <ul>
                            <li>Address: {marker.contact_info.address}</li>
                            <li>Phone: {marker.contact_info.phone}</li>
                            <li>Link: <a href={marker.contact_info.link}>{marker.contact_info.link}</a></li>
                            {tripAdvisorLine}
                        </ul>
                    </div>
                </InfoWindow>
            );
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
            defaultCenter={props.center}>
            {markers}
        </GoogleMap>
    );
}));

export default localMap
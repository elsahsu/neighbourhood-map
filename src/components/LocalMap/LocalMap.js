import React from 'react';
import './LocalMap.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const localMap = withScriptjs(withGoogleMap((props) => {
    // console.log('ShowInfoId:', props.showInfoId);
    const markers = props.markers.map(marker => {
        let infoWindow = null;
        let animation = window.google.maps.Animation.NONE;
        if (props.showInfoId === marker.id) {
            console.log(marker.contact_info);
            animation = window.google.maps.Animation.BOUNCE;
            let tripAdvisorLine = null;
            if (marker.trip_advisor.length > 10) {
                tripAdvisorLine = <li>TripAdvisor: <a href={marker.trip_advisor}>{marker.trip_advisor}</a></li>
            } else {
                tripAdvisorLine = <li>TripAdvisor ID: {marker.trip_advisor}</li>
            }

            let yelpInfo = <div> No data from Yelp </div>;
            if (props.yelp) {
                yelpInfo = (
                    <div>
                        <h3> Yelp </h3>
                        <ul>
                            <li> Price: {props.yelp.price} </li>
                            <li> Rating: {props.yelp.rating} </li>
                            <li> Reviews: {props.yelp.review_count} </li>
                            <li> <a href={props.yelp.url}>Link</a> </li>
                        </ul>
                    </div>
                );
            }
            infoWindow = (
                <InfoWindow className="InfoWindow">
                    <div>
                        <a href={marker.image.src}>
                            <img
                                src={marker.image.src}
                                alt={marker.image.title}
                                title={marker.image.title}
                                height="200px" />
                        </a>
                        <div dangerouslySetInnerHTML={{__html: marker.description}}></div>
                        <ul>
                            <li>Address: {marker.contact_info.address}</li>
                            <li>Phone: {marker.contact_info.phone}</li>
                            <li>Link: <a href={marker.contact_info.link}>{marker.contact_info.link}</a></li>
                            {tripAdvisorLine}
                        </ul>
                        {yelpInfo}
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
                animation={animation}
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
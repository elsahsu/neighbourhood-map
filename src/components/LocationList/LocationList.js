import React from 'react';
import './LocationList.css';

const locationList = (props) => {
    const locations = props.markers.map(marker => 
        <li key={marker.id}> {marker.title} <br /> [{marker.tags.join(', ')}] </li>
    )

    return (
        <ul className="LocationList">
            {locations}
        </ul>
    )
}

export default locationList

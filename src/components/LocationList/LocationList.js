import React from 'react';
import './LocationList.css';
import {translateTag} from '../TagFilter/TagFilter';

const locationList = (props) => {
    const locations = props.markers.map(marker => {
        const tags = marker.tags.map(tag => translateTag(tag));
        return (
            <li key={marker.id} onClick={() => props.clicked(marker)}>
                {marker.title}
                <div className="tags">{tags.join(', ')}</div>
            </li>
        );
    });

    return (
        <ul className="LocationList">
            {locations}
        </ul>
    )
}

export default locationList

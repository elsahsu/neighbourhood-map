import React from 'react';
import './TagFilter.css';

let translateTag = (tag) => {        
    if (tag === 'Hungry for Tampere')
        return tag;
    else if (tag === 'Puisto')
        return 'Park';
    else if (tag === 'Aktiviteetti lapsille')
        return 'For Children';
    else if (tag === 'Legendaarinen hotelli')
        return 'Famous Hotel';
    else if (tag === 'Lapsiystävällinen hotelli')
        return 'Child-friendly Hotel';
    else if (tag === 'Panimo ja panimoravintola')
        return 'Brewery and Restaurant';
    else if (tag === 'Maatilamatkailu')
        return 'Visitable Farm';
    else if (tag === 'Ryhmille')
        return 'For Groups';
    else if (tag === 'Näköalapaikka')
        return 'Scenic Overlook';
    return tag;
}

const tagFilter = (props) => {
    const options = props.tags.map(tag => 
        <option key={tag} value={tag}> {translateTag(tag)} </option>
    )

    return (
        <div className="TagFilter">
            <label for="tag-select">Select Type</label>
            <select
                id="tag-select"
                onChange={(event) => props.onSelectTag(event.target.value)}>
                <option value="All">Show all</option>
                {options}
            </select>
        </div>
    )
}

export default tagFilter;
export { translateTag };

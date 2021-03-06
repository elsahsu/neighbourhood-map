import React from 'react';
import './TagFilter.css';

/* Although VisitTampere API can serve most content in English, the tags
 * are always in Finnish so they need to be translated when shown to user. */
let translateTag = (tag) => {
    if (tag === 'Hungry for Tampere')
        return tag;
    else if (tag === 'Puisto')
        return 'Park';
    else if (tag === 'Eläinkahvila')
       return 'Animal Café';
    else if (tag === 'Aktiviteetti lapsille')
        return 'Activity for Children';
    else if (tag === 'Kulttuuria lapsille')
        return 'Culture for Children';
    else if (tag === 'Aktiviteetti järviluonnossa')
        return 'Lakeside';
    else if (tag === 'Legendaarinen hotelli')
        return 'Famous Hotel';
    else if (tag === 'Legendaarinen kahvila')
        return 'Famous Café';
    else if (tag === 'Legendaarinen ravintola')
        return 'Famous Restaurant';
    else if (tag === 'Lapsiystävällinen hotelli')
        return 'Child-friendly Hotel';
    else if (tag === 'Panimo ja panimoravintola')
        return 'Brewery and Restaurant';
    else if (tag === 'Pubi ja baari')
        return 'Pub';
    else if (tag === 'Maatilamatkailu')
        return 'Visitable Farm';
    else if (tag === 'Ryhmille')
        return 'Activity for Groups';
    else if (tag === 'Näköalapaikka')
        return 'Scenic Overlook';
    else if (tag === 'Talviuinti')
        return 'Winter swim';
    else if (tag === 'Yökerho')
        return 'Nightclub';
    return tag;
}

const tagFilter = (props) => {
    let sortedTags = props.tags;
    sortedTags.sort(function(a,b) {
        const transA = translateTag(a);
        const transB = translateTag(b);
        if (transA > transB)
          return 1;
        else
          return -1;
    });
    const options = sortedTags.map(tag =>
        <option key={tag} value={tag}> {translateTag(tag)} </option>
    )

    return (
        <div className="TagFilter">
            <label htmlFor="tag-select">Select Type</label>
            <select
                id="tag-select"
                tabIndex="1"
                onChange={(event) => props.onSelectTag(event.target.value)}
                value={props.currentTag}>
                <option value="All">Show all</option>
                {options}
            </select>
        </div>
    )
}

export default tagFilter;
export { translateTag };

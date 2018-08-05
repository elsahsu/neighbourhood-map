import React, { Component } from 'react';
import './App.css';
import LocalMap from './components/LocalMap/LocalMap';
import LocationList from './components/LocationList/LocationList';
import TagFilter from './components/TagFilter/TagFilter';


class App extends Component {
  state = {
    markers: [],
    tags: [],
    center: {
      lat: 61.498,
      lng: 23.76
    },
    currentTag: '', // Currently selected tag
    showInfoId: 0, // Currently shown info window location ID
    taggedMarkers: {} // Markers grouped by tags
  }

  componentDidMount() {
    const tampere_locations_url = 'https://visittampere.fi:443/api/location?lang=en&limit=100';
    fetch(tampere_locations_url)
      .then(result => result.json())
      .then(locations => {
        let markers = [];
        let tags = []
        let taggedMarkers = {}
        console.log(locations);
        locations.forEach(location => {
          if (location.tags.length > 0 && location.tripadvisor_embed.length) {
            // console.log(location.tags);
            const marker = {
              id: location.id,
              title: location.title,
              tags: location.tags,
              description: location.description,
              contact_info: location.contact_info,
              trip_advisor: location.tripadvisor_embed,
              image: location.image,
              position: {
                lat: location.location[0],
                lng: location.location[1]
              }
            }
            markers.push(marker);
            location.tags.forEach(tag => {
                if (!tags.includes(tag)) {
                  tags.push(tag);
                  taggedMarkers[tag] = [marker];
                } else {
                  taggedMarkers[tag].push(marker);
                }
            });
          }
        });

        console.log(markers);
        console.log(tags);
        this.setState({
          markers: markers,
          tags: tags,
          taggedMarkers: taggedMarkers,
          currentTag: 'Aktiviteetti lapsille'
        });
      }).catch(error => {
        console.log(error);
      });
  }

  markerClicked = (id) => {
    console.log('Marker clicked:' + id);
    this.setState({showInfoId: id});
  }

  selectTag = (tag) => {
    console.log('Selected tag: ', tag);
    this.setState({currentTag: tag});
  }

  locationClicked = (marker) => {
    console.log('Location clicked:', marker);
    this.setState({showInfoId: marker.id});
  }

  render() {
    let markers = this.state.markers;
    let currentTag = this.state.currentTag;
    if (currentTag && currentTag !== 'All')
    {
      markers = this.state.taggedMarkers[currentTag];
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighbourhood Map</h1>
        </header>
        <main>
          <section id="map-section"> 
          <LocalMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnXBaHfhOkAjzcKTCAmFt557I1h8jGiRQ&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className="MapContainer" style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `100%` }} className="LocalMap" aria-label="location" role="application" />}
            markers={markers}
            showInfoId={this.state.showInfoId}
            markerClicked={this.markerClicked}
            center={this.state.center}
          />
          </section>
          <section id="location-list-section">
          <TagFilter tags={this.state.tags.sort()} currentTag={this.state.currentTag} onSelectTag={this.selectTag} />
          <LocationList
            markers={markers}
            clicked={this.locationClicked}>
          </LocationList>
          </section>
        </main>
      </div>
    );
  }
}

export default App;

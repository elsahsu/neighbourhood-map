import React, { Component } from 'react';
import './App.css';
import LocalMap from './components/LocalMap/LocalMap';
import LocationList from './components/LocationList/LocationList';

class App extends Component {
  state = {
    markers: []
  }

  componentDidMount() {
    const tampere_locations_url = 'https://visittampere.fi:443/api/location?tag=Extreme&lang=en&limit=100';
    fetch(tampere_locations_url)
      .then(result => result.json())
      .then(locations => {
        let markers = [];
        console.log(locations);
        locations.forEach(location => {
          if (location.tags.length > 0) {
            console.log(location.tags);
            const marker = {
              id: location.id,
              title: location.title,
              tags: location.tags,
              description: location.description,
              contact_info: location.contact_info,
              position: {
                lat: location.location[0],
                lng: location.location[1]
              }
            }
            markers.push(marker);
          }
        });
        console.log(markers);
        this.setState({markers: markers});
      });
  }

  markerClicked(id) {
    console.log('Marker clicked:' + id);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighbourhood Map</h1>
        </header>
        <main>
          <LocalMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnXBaHfhOkAjzcKTCAmFt557I1h8jGiRQ&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className="MapContainer" style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} className="LocalMap" aria-label="location" role="application" />}
            markers={this.state.markers}
            showInfoWindow={false}
            markerClicked={this.markerClicked}
          />
          <LocationList
            markers={this.state.markers} />
        </main>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import LocalMap from './components/LocalMap/LocalMap';

class App extends Component {
  state = {
    markers: [
      {
        position: { lat: 61.5, lng: 23.75 }
      },
      {
        position: { lat: 61.498, lng: 23.76 }
      }
    ]
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighbourhood Map</h1>
        </header>
        <LocalMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnXBaHfhOkAjzcKTCAmFt557I1h8jGiRQ&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            markers={this.state.markers}
        />
      </div>
    );
  }
}

export default App;

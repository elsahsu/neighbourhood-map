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
    taggedMarkers: {}, // Markers grouped by tags
    yelpData: {}, // Data fetched from Yelp by ID
    warningMessage: '' // Warning for user if something does not work as expected
  }

  componentDidMount() {
    const tampere_locations_url = 'https://visittampere.fi:443/api/location?lang=en&limit=200';
    fetch(tampere_locations_url)
      .then(result => result.json())
      .then(locations => {
        let markers = [];
        let tags = []
        let taggedMarkers = {}
        // console.log(locations);
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

        // console.log(markers);
        // console.log(tags);
        this.setState({
          markers: markers,
          tags: tags,
          taggedMarkers: taggedMarkers,
          currentTag: 'Aktiviteetti lapsille'
        });
      }).catch(error => {
        console.log(error);
        this.setState({warningMessage: 'Unable to read attractions. Check connection.'});
      });
  }

  markerClicked = (marker) => {
    console.log('Marker clicked:' + marker);
    this.setState({showInfoId: marker});
  }

  selectTag = (tag) => {
    console.log('Selected tag: ', tag);
    this.setState({currentTag: tag});
  }

  getYelpData(marker) {
    /* Get additional data from Yelp, if available */
    /* Using phone number just to make sure that we don't get data from wrong place. */
    /* Also need to use https://cors-anywhere.herokuapp.com to avoid CORS problems */
    if (!marker.contact_info.phone) {
      console.log('No phone number, cannot search Yelp');
      return;
    }
    // const yelp_url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=' + marker.position.lat + '&longitude=' + marker.position.lng;
    const yelp_url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search/phone?phone=' + marker.contact_info.phone;
    console.log(yelp_url);
    let headers = new Headers();
    headers.append('Authorization', 'Bearer tltEfS9csV7_4C4E6ovF7h49dpNw6qhZiAhz87yPcmuElpnt_rIcspcGI1esYtas4v0HUB3zi8oZHVMl9QqEaTqIIz0UMZuIakOVxLEIP9kydCjrv01ui7oHHztnW3Yx');
    headers.append('Content-Type', "application/json; charset=utf-8");
    fetch(yelp_url, {
        method: 'GET',
        headers: headers,
      })
      .then(result => result.json())
      .then(data => {
        console.log(data);
        if (data && data.businesses && data.businesses.length === 1) {
          let yelpData = Object.assign(this.state.yelpData);
          const business_info = data.businesses[0];
          console.log('Saving yelp data: ', business_info)
          yelpData[marker.id] = business_info;
          this.setState({yelpData: yelpData});
        }
      })
      .catch(error => {
        console.error(error);
        console.error(error.message);
        this.setState({warningMessage: 'Unable to access Yelp. Check connection.'});
      });
  }

  locationClicked = (marker) => {
    console.log('Location clicked:', marker);
    this.setState({showInfoId: marker.id});
    this.getYelpData(marker);
  }

  render() {
    let markers = this.state.markers;
    let currentTag = this.state.currentTag;
    if (currentTag && currentTag !== 'All')
    {
      markers = this.state.taggedMarkers[currentTag];
    }

    let yelp = null;
    if (this.state.showInfoId && this.state.yelpData[this.state.showInfoId]) {
      yelp = this.state.yelpData[this.state.showInfoId];
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tampere Attractions</h1>
        </header>
        { this.state.warningMessage && <div className="WarningMessage"> {this.state.warningMessage} </div>}
        <main role="main">
          <section id="map-section"> 
          <LocalMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxheGiACe5WFMKf6-IbBiNANp5w1OW8tk&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className="MapContainer" style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `100%` }} className="LocalMap" aria-label="location" role="application" />}
            markers={markers}
            showInfoId={this.state.showInfoId}
            markerClicked={this.markerClicked}
            center={this.state.center}
            yelp={yelp}
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

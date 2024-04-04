import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import GoogleMapReact from "google-map-react";
import GoogleMap from "./GoogleMap";

export class AutoPlaceSearch extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      address: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lng: this.props.coordinates.length ? this.props.coordinates[0] : null,
        lat: this.props.coordinates.length ? this.props.coordinates[1] : null,
      },
    };
  }

  handleClick = (address, lng, lat) => {
    // setCoordinates([lng, lat]);
    // values.address = address;
    // values.location = {
    //   type: "Point",
    //   coordinates: [lng, lat],
  };
  //   };

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        // update center state
        console.log(latLng);
        this.setState({ mapCenter: latLng });
        console.log(
          "update : ",
          latLng
        )(
          this.props.handleClick(
            this.state.address,
            latLng.lng,
            latLng.lat,
            latLng
          )
        );
      })
      .catch((error) => console.error("Error", error));
  };

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.coordinates !== this.props.coordinates) {
      this.setState({
        mapCenter: {
          lat: prevProps.coordinates[1],
          lng: prevProps.coordinates[0],
        },
      });
    }
  }

  render() {
    console.log(this.props);
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="mapBox w-full h-full pt-6">
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className:
                  "location-search-input absolute top-0 left-0 w-full z-10",
              })}
            />
            <div className="autocomplete-dropdown-container absolute top-6 left-0 w-full z-10">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#DFDFDF", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            {/* <GoogleMap
                                centerMoved={this.props.centerMoved}
                            coordinates={{
                                type: "Point",
                                coordinates: [this.props.coordinates.coordinates[0], this.props.coordinates.coordinates[1]]
                            }} /> */}
            <div style={{ height: "300px" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyDLgr8YB5IK8dBIEWClexZGzXaB7UlVm7Q",
                }}
                defaultCenter={{ lat: 21.1702, lng: 72.8311 }}
                center={this.state.mapCenter}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                  this.props.loadMap(map, maps)
                }
              />
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDLgr8YB5IK8dBIEWClexZGzXaB7UlVm7Q",
})(AutoPlaceSearch);

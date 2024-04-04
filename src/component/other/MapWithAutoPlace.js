import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDLgr8YB5IK8dBIEWClexZGzXaB7UlVm7Q");
Geocode.enableDebug();
class MapWithAutoPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }

  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address;
        const addressArray = response.results[0].address_components;

        this.setState({
          address: address ? address : "",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this.state.markerPosition, this.props.center);
    if (this.state.markerPosition.lat !== this.props.center.lat) {
      return true;
    } else {
      return false;
    }
  }

  onPlaceSelected = (place) => {
    this.props.onPlaceSelected(place, "select");
    const address = place.formatted_address;
    const addressArray = place.address_components;
    const latValue = place.geometry.location.lat();
    const lngValue = place.geometry.location.lng();

    Geocode.fromLatLng(latValue, lngValue).then(
      (response) => {
        console.log(response);
        this.props.onPlaceSelected(response.results[0], "drag");
        const address = response.results[0].formatted_address;
        this.setState({
          address: address ? address : "",
        });
      },
      (error) => {
        console.error(error);
      }
    );

    // // Set these values in the state.
    // this.setState({
    //   address: address ? address : "",
    //   // markerPosition: {
    //   //   lat: latValue,
    //   //   lng: lngValue,
    //   // },
    //   // mapPosition: {
    //   //   lat: latValue,
    //   //   lng: lngValue,
    //   // },
    // });
  };
  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    console.log("event", event);
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        console.log(response);
        this.props.onPlaceSelected(response.results[0], "drag");
        const address = response.results[0].formatted_address;
        this.setState({
          address: address ? address : "",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={10}
          defaultCenter={{
            lat: this.props.center.lat,
            lng: this.props.center.lng,
          }}
        >
          {/* For Auto complete Search Box */}
          <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "100px",
              position: "absolute",
              top: 0,
            }}
            // options={{ types: ["(regions)"] }}
            types={['(regions)']}
            onPlaceSelected={this.onPlaceSelected}
          // types={["(regions)", "address"]} 
          />
          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.props.center.lat,
              lng: this.props.center.lng,
            }}
          />
          <Marker />
          {/* InfoWindow on top of marker */}
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <AsyncMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLgr8YB5IK8dBIEWClexZGzXaB7UlVm7Q&libraries=places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}
export default MapWithAutoPlace;

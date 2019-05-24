import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  GoogleMapProps,
  WithGoogleMapProps
} from "react-google-maps";

interface MapProps extends WithGoogleMapProps {
  isMarkerShown: boolean;
}

export const Map = withScriptjs(
  withGoogleMap((props: MapProps) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
    </GoogleMap>
  ))
);

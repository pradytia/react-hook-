import React, { useEffect, useState, useCallback } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Geocode from "react-geocode";

import { Grid, Paper, makeStyles, IconButton, Button } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import RoomIcon from "@material-ui/icons/Room";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import arrow from "../asset/image/arrow-left.svg";
import mapStyles from "../asset/js/mapStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    // padding: theme.spacing(1),
    margin: "auto",
    maxWidth: 500,
    color: theme.palette.text.secondary,
  },

  rootSearch: {
    padding: "1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    marginTop: 15,
    margin: "auto",
    // backgroundImage :  `url(${maps})`
  },
  marginArrow: {
    marginTop: 15,
    border: "1px",
    paddingLeft: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  backgroundimageMaps: {
    flex: 1,
    // backgroundPosition: "center",
    height: "800px",
    //   width : '100%',
    margin: "auto",
    maxWidth: 500,
  },
  outlineP: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const cardStyles = makeStyles({
  root: {
    width: 500,
    height: 150,
  },
  rootMb: {
    width: "100%",
    height: 150,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: "-3rem",
    zIndex: 10,
  },
});

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const defCenter = {
  lat: 43.6532,
  lng: -79.3832,
};

function ReactMap() {
  const classes = useStyles();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC4a8ijWorZUkJKOtzheGKtV1RlyfDYW24",
    libraries,
  });

  const [center, setCenter] = React.useState({
    lat: defCenter.lat,
    lng: defCenter.lng,
  });
  const [markers, setMarkers] = React.useState({});
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();

  const onMapClick = React.useCallback((e) => {
    convertToAddres(e.latLng.lat(), e.latLng.lng());
  }, []);

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
    convertToAddres(lat, lng);
  }, []);

  const handleBoundsChanged = () => {
    const mapCenter = mapRef.current.getCenter(); //get map center
    convertToAddres(mapCenter.lat(), mapCenter.lng());
  };

  Geocode.setApiKey("AIzaSyC4a8ijWorZUkJKOtzheGKtV1RlyfDYW24");

  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  const convertToAddres = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setMarkers({
          lat: lat,
          lng: lng,
          address: address,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log(position);
          convertToAddres(center.lat, center.lng);
        },
        () => null
      );
    }
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <div className={classes.backgroundimageMaps}>
        <Paper>
          <Grid container spacing={0}>
            <Grid item xs={1} component={RouterLink} to="/">
              <img alt="complex" src={arrow} className={classes.marginArrow} />
            </Grid>
            <Grid item xs={5}>
              <p style={{ marginTop: 13, color: "grey", fontWeight: "bold" }}>
                Pesanan Baru
              </p>
            </Grid>
          </Grid>
        </Paper>

        {/* <Locate panTo={panTo} /> */}
        <Search panTo={panTo} />
        <FooterMap
          address={markers.address}
          lat={markers.lat}
          lng={markers.lng}
        />

        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
          onBoundsChanged={handleBoundsChanged}
        >
          {
            <Marker
              key={`${markers.lat}-${markers.lng}`}
              position={{ lat: markers.lat, lng: markers.lng }}
              onClick={() => {
                setSelected(markers);
              }}
              icon={{
                url: `pin.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          }

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>
                  <span role="img" aria-label="bear">
                    <RoomIcon />
                  </span>{" "}
                  Location
                </h2>
                <p>{selected.address}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const classes = useStyles();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat, lng);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((option) => option.description)}
        onChange={(event, value) => handleSelect(value)}
        renderInput={(params) => (
          <Paper className={classes.rootSearch}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <SearchIcon />
            </IconButton>
            <TextField
              {...params}
              className={classes.input}
              size={"small"}
              label="Search"
              margin="normal"
              variant="outlined"
              value={value}
              onChange={handleInput}
              InputProps={{ ...params.InputProps, type: "search" }}
            />
            <IconButton
              color="primary"
              className={classes.iconButton}
              aria-label="directions"
            >
              <BookmarkIcon />
            </IconButton>
          </Paper>
        )}
      />
    </div>
  );
}

function FooterMap({ address, lat, lng }) {
  const classes = cardStyles();
  const history = useHistory();

  const matches = useMediaQuery("(min-width:600px)");

  const btnHanler = () => {
    if (address !== null) {
      history.push("/Cust-Pickup-Detail", {
        address: address,
        lat: lat,
        lng: lng,
      });
    }
  };

  return (
    <>
      <div className={classes.footer}>
        <Card className={matches ? classes.root : classes.rootMb}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {address}
            </Typography>
            <Button
              variant="contained"
              style={{
                marginTop: 10,
                backgroundColor: "orange",
                color: "white",
              }}
              fullWidth
              onClick={btnHanler}
            >
              Pesan
            </Button>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </div>
    </>
  );
}

export default ReactMap;

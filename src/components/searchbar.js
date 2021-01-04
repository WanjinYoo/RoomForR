import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { connect } from 'react-redux';

const  mapStateToProps = state => {
  return {
    address: state.address,
    geoCode: state.geoCode,
    search: state.search
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setAddress: (address) => dispatch({type: "GET_ADDRESS", address}),
    setGeoCode: (geoCode) => dispatch({type: "GET_GEOCODE", geoCode}),
    triggerSearch: (search) => dispatch({type: "TRIGGER_SEARCH", search})
  }
}

const Searchbar = (props) => {
  const handleChange = address => {
    props.setAddress(address);
  };
  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  geocodeByAddress(props.address)
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) =>{
    props.setGeoCode({
      lat,
      lng
    });
    
  }
  );
  // search the location where the user want to find a room
  return (
    <PlacesAutocomplete
    value={props.address}
    onChange={handleChange}
    onSelect={() => handleSelect}
  >
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div className= "center">
        <input
          {...getInputProps({
            placeholder: 'Enter your address...',
            className: 'location-search-input',
          })}
        />
        <div className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map(suggestion => {
            const className = suggestion.active
              ? 'suggestion-item--active'
              : 'suggestion-item';
            const style = suggestion.active
              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
              : { backgroundColor: '#ffffff', cursor: 'pointer' };
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
        <button
        onClick = {() => {
          if(props.address){
          props.triggerSearch(true)
          }
        }
        }
        >Search</button>
      </div>
    )}
  </PlacesAutocomplete>
  )
}
export default connect(mapStateToProps,mapDispatchToProps)(Searchbar);

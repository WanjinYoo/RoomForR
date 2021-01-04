import React from 'react'
import { connect } from 'react-redux';
import { GoogleMap , Marker, Circle} from '@react-google-maps/api';
import './location.scss';
import Match from './match'


const mapStateToProps = state => {
  return {
    address: state.address,
    geoCode: state.geoCode,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    triggerSearch: (search) => dispatch({type: "TRIGGER_SEARCH", search})
  }
}
//generates map from the search.
const Location = (props) => {
  const containerStyle = {
    width: '50rem',
    height: '25rem'
  };
    return(
      
    <div className = "map">
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={props.geoCode}
      zoom={13}
    >
      { /* Child components, such as markers, info windows, etc. */ }
    <Marker
    title={'Location'}
    name={'Your location'}
    position={props.geoCode} />
    <Circle center={props.geoCode} radius={2000} />
    </GoogleMap>
    <h2> {props.address}</h2>
    <h3> The match will be triggered within the circular area.</h3>
    <h3> Click on the Match button to proceed</h3>
    <div>
    <button
        onClick = {() => props.triggerSearch(false)}
        >Back</button>
    <Match></Match>
    </div>
    </div>

  )
}
export default React.memo(connect(mapStateToProps,mapDispatchToProps)(Location));


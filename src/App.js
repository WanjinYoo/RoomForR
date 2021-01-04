import React, { Fragment, useEffect } from 'react'
import './app.scss';
import axios from 'axios';
import  Navlist from "./components/navList"
import Searchbar from "./components/searchbar"
import Location from "./components/location"
import Mylist from "./components/myList"
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';



const  mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser,
    search: state.search,
    mylist: state.mylist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getList : (rooms) => dispatch({type: "GET_MYLIST", list: rooms}),
  }
}
const App = (props) => {

    if(props.loggedInUser)
    axios.get(`./api/users/${props.loggedInUser.id}`)
  .then((res) => {
    props.getList(res.data)
  })

  const list = props.mylist.map((item,index) => {
    return (
      <Mylist
      key = {index}
      id = {item.id}
      address = {item.address}
      description = {item.description}
      price = {item.price}
      />
    );
  })


  return (
  <main 
  style={{
    backgroundImage : `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("images/main.png")`
  }}>
    
    <BrowserRouter>
    {!props.loggedInUser && <Navlist/>}
    {props.loggedInUser && <Navlist navContent="MyLists" login = "LOGOUT"/>}
   <Switch>
    <Route exact path = '/'> 
   <Fragment>
   {!props.search && <Searchbar />}
   {props.search && <Location />}
   </Fragment>
   </Route>

    <Route path = '/myList'>
      {list}
    </Route>
   </Switch>
   </BrowserRouter>

  </main>
  )
}
export default connect(mapStateToProps,mapDispatchToProps)(App)
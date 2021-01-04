const initialState ={
  address: "",
  geoCode: {},
  search: false,
  matchIndex: 0,
  rooms: null,
  loggedInUser: null,
  mylist: [],
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_ADDRESS':
      return {      
        ...state,  
        address: action.address
      }
    case 'GET_GEOCODE':
      return {
        ...state,
        geoCode: action.geoCode
      }
      case 'TRIGGER_SEARCH':
        return {
          ...state,
          search: action.search
        }
        case 'NEXT_ROOM_INDEX':
          return {
           ...state,
           matchIndex: state.matchIndex + action.index
          }
        case 'GET_ROOMS':
          return {
            ...state,
            rooms: action.rooms
          }
        case 'LOGIN_USER':
          return {
            ...state,
            loggedInUser: action.login
          }
          case 'GET_MYLIST':
          return {
            ...state,
            mylist: action.list
          }
    default:
      return state;
  }
};

export default reducer;
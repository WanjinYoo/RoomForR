import axios from 'axios'

export const signUp = (user) => {
  return axios.post('./api/users/signup',user)
}

export const logInUser = (user) => {
  return axios.post('./api/users/login',user)
  .then((res) => {
    return res.data[0]
  })
  .catch((err) => {
    return false
  })
}
export const saveToList = (room_id,user_id) => {
  return axios.post('./api/users/mylist', {
    userid: user_id,
    roomid: room_id
  })
}
export const deletePost = (id) => {
  return axios.delete(`./api/users/list/${id}`,null)
}
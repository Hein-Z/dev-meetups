import firebase from 'firebase'

export default (to, form, next) => {
  if (firebase.auth().currentUser) {
    next()
  } else {
    next('signin')
  }
}

export default ({ store, redirect }) => {
  // If the user is not authenticated
  if (!store.state.user.isLoggedIn) {
    return redirect('/auth/login')
  }
}

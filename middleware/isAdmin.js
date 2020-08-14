export default ({store, error}) => {
  if(!store.state.user.authUser || (store.state.user.authUser.roles.ID != 1)) {
    error({ statusCode: 403 });
  }
}

export default ({store, error}) => {
  if(!store.state.user.authUser || (store.state.user.authUser.roles.ID != 1 && store.state.user.authUser.roles.ID != 2)) {
    error({ statusCode: 403 });
  }
}

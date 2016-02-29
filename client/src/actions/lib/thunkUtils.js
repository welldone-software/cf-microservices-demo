export function reduxThunk(fn){
  return function(state, dispatch){
    return fn(state, dispatch);
  };
}

export function reduxThunkPromise(baseName, fn, payload){
  return (dispatch, getState) => {
    dispatch({type: `${baseName}_LOADING`, payload});
    fn(getState())
      .then(response => dispatch({type: `${baseName}_SUCCESS`, response}))
      .catch(error => dispatch({type: `${baseName}_FAILURE`, error}));
  };

  //return reduxThunk((state, dispatch) => {
  //  dispatch({type: `${baseName}_LOADING`});
  //  fn(state)
  //    .then(res => dispatch({type: `${baseName}_SUCCESS`, res}))
  //    .catch(err => dispatch({type: `${baseName}_FAILURE`, err}));
  //});
}
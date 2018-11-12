
export const STATUS_READY = 'STATUS_READY';
export const statusReady = () => {
  return {
    type: STATUS_READY
  }
}
export const STATUS_LOADING = 'STATUS_LOADING';
export const statusLoading = () => {
  return {
    type: STATUS_LOADING
  }
}
export const STATUS_ERROR = 'STATUS_ERROR ';
export const statusError = () => {
  return {
    type: STATUS_ERROR
  }
}

export const RECEIVE_SHORT = 'RECEIVE_SHORT';
export const receiveShort = (json) => {
  return {
    type: RECEIVE_SHORT,
    payload: json
  }
}

export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const receiveError = (json) => {
  return {
    type: RECEIVE_ERROR,
    payload: json.error,
  }
}

export const registerURL = (url) => {
  return (dispatch) => {
    dispatch(statusLoading());

    var formData = new URLSearchParams();
    formData.append('url', url);

    return fetch('/api', {
      method: "post",
      body: formData
    }).then(res => {
      if (!res.ok) {
        throw res.json();
      } else {
        return res.json();
      }
    }).then(json => {
      return {
        url: json.url,
        shorturl: json.shorturl,
        created: new Date(json.created)
      };
    }).then(item => {
      dispatch(statusReady());
      dispatch(receiveShort(item)) 
    }).catch(errjson => {
      errjson.then(function(json) {
        dispatch(statusError());
        dispatch(receiveError(json));
      });
    });
  }
}
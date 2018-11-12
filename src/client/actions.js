
export const RECEIVE_SHORT = 'RECEIVE_SHORT';
export const receiveShort = (json) => {
  return {
    type: RECEIVE_SHORT,
    payload: json
  }
}

export const registerURL = (url) => {
  return (dispatch) => {
    // TODO notify app that api call is starting
    // TODO validate url

    var formData = new URLSearchParams();
    formData.append('url', url);

    return fetch('/api', {
      method: "post",
      body: formData
    }).then(res => {
      return res.json();
    }).then(json => {
      return {
        url: json.url,
        shorturl: json.shorturl,
        created: new Date(json.created)
      };
    }).then(item => {
      dispatch(receiveShort(item)) 
    });
  }
}
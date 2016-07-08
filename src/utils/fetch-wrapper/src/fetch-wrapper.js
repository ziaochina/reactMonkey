export default function fetchWrapper(options={}, attempt=0, retryIntervals=retryIntervals) {
  const onFetchSuccess  = options.onSuccess;
  const onFetchFail     = onFail.bind(null, options, attempt, options.retryIntervals || retryIntervals);
  const onError         = handleError.bind(null, options, attempt)

  options.request()
    .then(parseResponse.bind(null, options), onFetchFail) // catch errors from fetch request
    .then(onFetchSuccess, onError) // catch errors from status codes or parsing data in onFetchComplete
    .catch(onError) // catch errors from onSuccess or parsing data
}

const retryIntervals = [1000]; // default value of the time intervals at which to retry the request

export const onFail = (options, attempt, error) => {
  if (retryIntervals[attempt]) {
    setTimeout(
      () => fetchWrapper(options, ++attempt),
      retryIntervals[attempt]
    )
  } else {
    const status = error.response ? error.response.status : 'error'; // Treat network errors without responses as 500s (internal server error).
    const message = error.message;
    return options.onError({status, message});
  }
}

export const parseResponse = (options, res) => {
  const { responseType: type } = options;
  if (type && type == 'text') {
    return res.text();
  } else if (type && type == 'json') {
    //支持json中的方法调用。如：$T.DTO。by lsg
    var r = null;
    // r = res.json();
    r = res.text().then(r => (new Function("return " + r))());
    return r;
    //return res.json();
  } else {
    throw new Error('Invalid Response Type');
  }
}

const handleError = (options, attempt, error) => {
  const errorMessage = error.toString();
  if (errorMessage === 'SyntaxError: Unexpected end of input') {
    options.onSuccess({status: 'error', message: 'No response body'})  // error in res.json/res.text
  } else if (errorMessage === 'Error: Invalid Response Type') {
    options.onSuccess({status: 'error', message: 'Invalid Response Type'})  // error in options for fetch wrapper
  } else {
    return options.onError({status: 'error', message: errorMessage})
  }
}

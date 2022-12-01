/**
 * Provide a resolver function for the queryAsset middleware.
 * @param query The GraphQL query to execute.
 * @param url The URL of the GraphQL GENERAL API.
 * @returns {Promise<any>} A promise that resolves to the result of the query in JSON format.
 */
const queryAsset = async (query, url) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  })
    .then(async response => {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;

      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
      }
      return data;
  })
    .then((response) => response.data)}


export default queryAsset;

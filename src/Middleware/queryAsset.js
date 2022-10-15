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
            "Accept": "application/json",
        },
        body: JSON.stringify({
            query,
        }),
    })
        .then((response) => response.json())
        .then((response) => response.data)
}

export default queryAsset

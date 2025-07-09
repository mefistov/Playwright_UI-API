export const ApiRequestData = {
    baseUrl: process.env.API_BASE_URL,
    headers: {
        contentType: process.env.CONTENT_TYPE ?? 'application/json',
    },
};
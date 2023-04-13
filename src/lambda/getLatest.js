import fetch from 'node-fetch';

exports.handler = async (event) => {
    const offset = parseInt(event.queryStringParameters.offset || 30, 10);
    const limit = parseInt(event.queryStringParameters.limit || 30, 10);

    try {
      const response = await fetch(`https://tfb-api.netlify.app/api/getLatest?offset=${offset}&limit=${limit}`);
      const result = await response.json();

      return {
        statusCode: 200,
        body: JSON.stringify(result.reverse(), null, 2)
      };
    } catch (error) {
      console.error('fetch error', { error });

      return {
          statusCode: 500,
          body: JSON.stringify({ error }, null, 2)
      };
    }

}
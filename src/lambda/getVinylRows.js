import fetch from 'node-fetch';

exports.handler = async () => {
    try {
      const response = await fetch(`https://tfb-api.netlify.app/api/getVinylRows?limit=200`);
      const result = await response.json();

      return {
        statusCode: 200,
        body: JSON.stringify(result, null, 2)
      };
    } catch (error) {
      console.error('fetch error', { error });

      return {
          statusCode: 500,
          body: JSON.stringify({ error }, null, 2)
      };
    }

}
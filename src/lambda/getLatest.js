import fetch from 'node-fetch';

exports.handler = async () => {
    try {
      const response = await fetch(`https://tfb-api.netlify.app/api/getLatest?offset=500&limit=500`);
      const result = await response.json();
      
      console.log({ rl: result.length });

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
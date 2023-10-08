const elasticsearchUrl = 'http://localhost:9200';

fetch(`${elasticsearchUrl}/`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log('Elasticsearch cluster information:', data);
  })
  .catch((error) => {
    console.error('Error connecting to Elasticsearch:', error);
  });

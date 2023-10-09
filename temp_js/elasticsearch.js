const { Client } = require('@elastic/elasticsearch');
const client = new Client({
  node: 'http://localhost:9200', // Replace with your Elasticsearch server URL
  auth: {
    username: 'sid',
    password: 'password',
  },
});

async function searchDocuments(indexName) {
  try {
    const response = await client.search({
      index: indexName,
      body: {
        query: {
          match: {
            test: 'testing',
          },
        },
      },
    });

    console.log('Search results:', response.body.hits.hits);
  } catch (error) {
    console.error('Error searching documents:', error);
  }
}

async function deleteIndex(indexName) {
  try {
    await client.indices.delete({
      index: indexName,
    });
    console.log(`Index "${indexName}" deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting index "${indexName}":`, error);
  }
}

async function createIndex(indexName) {
  try {
    await client.indices.create({
      index: indexName,
    });
    console.log(`Index "${indexName}" created successfully.`);
  } catch (error) {
    console.error(`Error creating index "${indexName}":`, error);
  }
}

async function addDocument(indexName, document) {
  try {
    const response = await client.index({
      index: indexName,
      body: document,
    });
    console.log('Document added:', response.body);
  } catch (error) {
    console.error('Error adding document:', error);
  }
}



const indexName = 'test-index'; // Replace with your desired index name
const document = {
  test:'testing',
  test2:'testingagain'
}

async function check(indexName,document){
  await createIndex(indexName);

  await addDocument(indexName,document)

  await searchDocuments(indexName);

  await deleteIndex(indexName);

  client.close();
}

check(indexName,document);



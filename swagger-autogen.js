import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API RESTful BLOGGING',
    description: 'responsible for creating, reading, modifying and deleting user data, posts, comments and categories'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen()(outputFile, routes, doc);
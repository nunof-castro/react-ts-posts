# React Posts

## Project Description

This project is a React application built with TypeScript that consumes data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/). It allows users to:

- List all posts
- Show all comments for a given post
- Write, update, and delete a comment

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/nunof-castro/react-ts-posts
   cd react-ts-posts
   ```
2. Install the dependencies:
   ```
   yarn install
   ```
3. Create a .env file in the root of the project and add the following line, specifying the URL of the API:
   ```
   REACT_APP_API_URL=https://jsonplaceholder.typicode.com
   ```
   You can use the provided .env.example file as a reference.

## Running the Application

To start the development server, run:

```
yarn start
```

This will start the application at http://localhost:3000.

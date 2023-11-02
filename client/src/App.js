import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './pages/404';
import Project from './pages/Project';

import Home from './pages/Home';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// let uri;

// if (process.env.NODE_ENV === 'production') {
//   uri = process.env.REACT_APP_SERVER_GRAPHQL;
// } else {
//   uri = process.env.REACT_APP_CLIENT_GRAPHQL;
// }

const client = new ApolloClient({
  uri: '/graphql',
  cache,
});

// const client = new ApolloClient({
//   uri: 'http://localhost:5001/graphql',
//   cache,
// });

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;

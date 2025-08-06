import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import { ApolloProvider } from '@apollo/client';
import { client } from './api/client';
import EditJob from './pages/EditJob/EditJob';
import ViewJob from './pages/ViewJob/ViewJob';
import CreateJob from './pages/CreateJob/CreateJob';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route
              path="/create-job/"
              element={
                <CreateJob />
              }
            />
            <Route
              path="/edit-job/:jobId"
              element={
                <EditJob />
              }
            />
            <Route
              path="/view-job/:jobId"
              element={
                <ViewJob />
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </Provider>
  );
}

export default App;

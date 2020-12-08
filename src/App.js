import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./App.module.css";

import Container from "react-bootstrap/Container";
import Layout from "./containers/Layout/Layout";
import Routes from "./components/Routes/Routes";

const App = () => {
  return (
    <Container fluid className={classes.App}>
      <Layout>
        <Routes />
      </Layout>
    </Container>
  );
};

export default App;

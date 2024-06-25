import "./App.css";
import { Outlet } from "react-router-dom";

import { Header } from "./components/header";
import { Footer } from "./components/footer";

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = () => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  const headers = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

function App() {
  return (
    <>
      <Header />
      <Outlet authLink={authLink} />
      <Footer />
    </>
  );
}

export default App;

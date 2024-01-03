import Header from "./components/Header";
import Cards from "./components/Cards";
import { Routes, Route } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Detail from "./components/Detail";
import { createContext, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

// create context to share data across the app
const AppState = createContext();

function App() {
  const [login, setLogin] = useState(false);

  const [userName, setUserName] = useState("");

  return (
    // provide context value in AppState
    <AppState.Provider value={{ login, setLogin, userName, setUserName }}>
      <div className="App">
        <Header />
        <Routes>
          {/* home page route */}
          <Route path="/" element={<Cards />} />

          {/* add movie form route */}
          <Route path="/add-movie" element={<AddMovie />} />

          {/* detail page route */}
          <Route path="/details/:id" element={<Detail />} />

          {/* login page route */}
          <Route path="/login" element={<Login />} />

          {/* sign up page route */}
          <Route path="/signup" element={<Signup />} />

          {/* error page route */}
          <Route path="*" element={<h1>Page not found...!!</h1>} />
        </Routes>
      </div>
    </AppState.Provider>
  );
}

export default App;
export { AppState };

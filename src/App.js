// App.js
import React, { createContext, useState } from "react";
import { Routes,Route} from "react-router-dom";
import MainPage from "./MainPage";
import PictureDetail from "./PictureDetail";



export const MovieContext = createContext(null);

function App() {
  const [user, setUser] = useState([]);
  return (
    <MovieContext.Provider value={[user, setUser]}>
      <Routes>
      
      <Route path="/"  element={<MainPage />} />
      <Route path="/:id" element={<PictureDetail />} />
    
  </Routes>
  </MovieContext.Provider>
    
  );
}

export default App;

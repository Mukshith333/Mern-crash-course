import { useState } from "react";
import { Button, Box } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Box minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;

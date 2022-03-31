import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { ConfigProvider } from "../../context/config";
import "../../index.css";
import Footer from "../Footer";
import Panel from "../Panel";
import Settings from "../Settings";


function App() {
  return (
    <div>
      <ChakraProvider>
        <ConfigProvider>
          <Settings />
          <Panel />
          <Footer />
        </ConfigProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;

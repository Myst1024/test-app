import React from "react";
import { Provider as PaperProvider } from "react-native-paper";

const Providers = ({ children }) => <PaperProvider>{children}</PaperProvider>;

export default Providers;

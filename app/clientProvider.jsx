"use client";

import { NextUIProvider } from "@nextui-org/system";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function ClientProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

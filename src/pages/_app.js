import { Provider } from "react-redux";
import { store } from "../store/store";
import "@/styles/globals.css";
import localFont from "next/font/local";

const openSans = localFont({
  src: [
    { path: "../fonts/OpenSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/OpenSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/OpenSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/OpenSans-Italic.ttf", weight: "400", style: "italic" },
  ],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className={openSans.className}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

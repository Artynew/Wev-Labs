import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Content from "./components/Content/Content";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { userReducer } from "./store/redux";
import { ThemeProvider } from "./Context/ThemeContext";

const store = createStore(userReducer);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
          <Content />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

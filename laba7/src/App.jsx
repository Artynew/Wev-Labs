import "bootstrap/dist/css/bootstrap.min.css"; // Подключение стилей Bootstrap
import "./App.css";
import Content from "./components/Content";
import { Provider } from "react-redux"; // Провайдер Redux
import { createStore } from "redux";
import { userReducer } from "./store/redux";

// Создание Redux-стора
const store = createStore(userReducer);

function App() {
  return (
    <Provider store={store}> {/* Обертка для доступа к хранилищу */}
        <Content /> {/* Главный компонент приложения */}
    </Provider>
  );
}

export default App;
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

let feedbacks = [
    { id: 1, author: "admin", answer: "отличный сайт!"},
    { id: 2, author: "admin", answer: "текст" },
    { id: 3, author: "admin", answer: "сайт работает" },
];

// Mock-данные: хранилище пользователей
const users = [{ id: 1, login: "artem", password: "artem", email: "gumenyk.artem@bk.ru" }];

// Получение всех отзывов
app.get("/feedbacks", (req, res) => {
    const items = JSON.stringify(feedbacks);
    res.send(items);
});

// Добавление нового отзыва
app.post("/feedbacks", (req, res) => {
    let maxId = 0;
    if (feedbacks.length > 0) {
        maxId = feedbacks[feedbacks.length - 1]["id"]; // Находим максимальный ID
    }
    const newItem = {
        id: maxId + 1,
        author: req.body.author,
        answer: req.body.answer,
        
    };
    feedbacks.push(newItem); // Добавляем в массив
    res.sendStatus(200); // Отправляем статус "OK"
});

// Удаление отзыва по ID
app.delete("/feedbacks/:id", (req, res) => {
    feedbacks = feedbacks.filter((el) => {
        return el.id != parseInt(req.params.id); // Фильтруем массив, исключая удаляемый элемент
    });
    res.send(feedbacks); // Возвращаем обновленный список
});

// Регистрация нового пользователя
app.post("/register", (req, res) => {
    const user = users.find((el) => el.login == req.body.username);
    if (!user) {
        const newUser = {
            id: users.length + 1,
            login: req.body.username,
            password: req.body.password,
            email: req.body.email
        };
        users.push(newUser);
        res.sendStatus(200); // Успешная регистрация
    } else {
        res.sendStatus(409); // Конфликт: пользователь уже существует
    }
});

// Авторизация пользователя
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const currentUser = users.find((el) => el.login === username);
    
    if (!currentUser) {
      return res.status(401).json({ error: "Пользователь не найден" });
    }
    
    if (currentUser.password !== password) {
      return res.status(401).json({ error: "Неверный пароль" });
    }
    
    res.json(currentUser); // Успешный вход
  });

// Получение профиля пользователя
app.get("/profile/:username", (req, res) => {
    const currentUser = users.find((el) => el.login == req.params.username);
    res.send(JSON.stringify(currentUser)); // Отправляем данные профиля
});

// Обновление профиля пользователя
app.put("/profile", (req, res) => {
    const currentUser = users.find((el) => {
        if (el.id == req.body.id) {
            el.login = req.body.username;
            el.password = req.body.password;
            res.sendStatus(200); // Успешное обновление
        }
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
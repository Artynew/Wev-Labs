import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Middleware для задержки в 2 секунды
app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000);
});

let feedbacks = [
  { id: 1, author: "admin", answer: "Хороший сайт" },
  { id: 2, author: "admin", answer: "Здесь вы можете писать свои отзывы" },
  { id: 3, author: "user1", answer: "Отличный функционал!" },
  { id: 4, author: "user2", answer: "Быстрая работа сайта" },
  { id: 5, author: "user3", answer: "Удобный интерфейс" },
  { id: 6, author: "user4", answer: "Все понятно и просто" },
  { id: 7, author: "user5", answer: "Отличная поддержка" },
  { id: 8, author: "user6", answer: "Рекомендую друзьям" },
  { id: 9, author: "user7", answer: "Лучший сайт в этой тематике" },
  { id: 10, author: "user8", answer: "Все работает без нареканий" },
  { id: 11, author: "user9", answer: "Удобная навигация" },
  { id: 12, author: "user10", answer: "Быстрый отклик на действия" },
  { id: 13, author: "user11", answer: "Приятный дизайн" },
  { id: 14, author: "user12", answer: "Хорошая скорость загрузки" },
  { id: 15, author: "user13", answer: "Все функции работают стабильно" },
  { id: 16, author: "user14", answer: "Интуитивно понятный интерфейс" },
  { id: 17, author: "user15", answer: "Часто пользуюсь этим сайтом" },
  { id: 18, author: "user16", answer: "Лучшая реализация подобного сервиса" },
  { id: 19, author: "user17", answer: "Ни разу не было сбоев" },
  { id: 20, author: "user18", answer: "Очень доволен работой сайта" },
  { id: 21, author: "user19", answer: "Быстро нашел нужную информацию" },
  { id: 22, author: "user20", answer: "Удобно расположены элементы" },
  { id: 23, author: "user21", answer: "Четкие инструкции для пользователей" },
  { id: 24, author: "user22", answer: "Стабильная работа без глюков" },
  { id: 25, author: "user23", answer: "Интересный подход к оформлению" },
  { id: 26, author: "user24", answer: "Удобная система поиска" },
  { id: 27, author: "user25", answer: "Приятные цветовые сочетания" },
  { id: 28, author: "user26", answer: "Быстрая регистрация" },
  { id: 29, author: "user27", answer: "Хорошо продуманный функционал" },
  { id: 30, author: "user28", answer: "Легко разобраться даже новичку" },
  { id: 31, author: "user29", answer: "Удобно с любого устройства" },
  { id: 32, author: "user30", answer: "Оперативная техническая поддержка" },
  { id: 33, author: "user31", answer: "Приятно пользоваться" },
  { id: 34, author: "user32", answer: "Часто добавляют новые функции" },
  { id: 35, author: "user33", answer: "Стабильно работает" },
  { id: 36, author: "user34", answer: "Просто и удобно" },
  { id: 37, author: "user35", answer: "Быстрая загрузка страниц" },
  { id: 38, author: "user36", answer: "Удобный личный кабинет" },
  { id: 39, author: "user37", answer: "Интересный контент" },
  { id: 40, author: "user38", answer: "Хорошая система уведомлений" },
  { id: 41, author: "user39", answer: "Удобно организованное меню" },
  { id: 42, author: "user40", answer: "Оптимальная скорость работы" },
  { id: 43, author: "user41", answer: "Привлекательный минималистичный дизайн" },
  { id: 44, author: "user42", answer: "Все разделы логично расположены" },
  { id: 45, author: "user43", answer: "Нет лишней рекламы" },
  { id: 46, author: "user44", answer: "Удобная система фильтрации" },
  { id: 47, author: "user45", answer: "Быстрая реакция на клики" },
  { id: 48, author: "user46", answer: "Не нашел ошибок в работе" },
  { id: 49, author: "user47", answer: "Хорошо оптимизирован" },
  { id: 50, author: "user48", answer: "Работает плавно без подвисаний" },
  { id: 51, author: "user49", answer: "Отличная мобильная версия" },
  { id: 52, author: "user50", answer: "Удобные шрифты и размеры" },
  { id: 53, author: "user51", answer: "Быстрое выполнение операций" },
  { id: 54, author: "user52", answer: "Понятные подсказки" },
  { id: 55, author: "user53", answer: "Хорошая структура информации" },
  { id: 56, author: "user54", answer: "Удобные формы ввода" },
  { id: 57, author: "user55", answer: "Быстрое обновление данных" },
  { id: 58, author: "user56", answer: "Приятные анимации" },
  { id: 59, author: "user57", answer: "Удобная система сортировки" },
  { id: 60, author: "user58", answer: "Хорошая читаемость текста" },
  { id: 61, author: "user59", answer: "Быстрое восстановление пароля" },
  { id: 62, author: "user60", answer: "Удобные иконки" },
  { id: 63, author: "user61", answer: "Хорошая контрастность" },
  { id: 64, author: "user62", answer: "Быстрое переключение между разделами" },
  { id: 65, author: "user63", answer: "Удобные горячие клавиши" },
  { id: 66, author: "user64", answer: "Хорошая система рекомендаций" },
  { id: 67, author: "user65", answer: "Быстрое добавление в избранное" },
  { id: 68, author: "user66", answer: "Удобная история действий" },
  { id: 69, author: "user67", answer: "Хорошая система оценок" },
  { id: 70, author: "user68", answer: "Быстрое оформление заказов" },
  { id: 71, author: "user69", answer: "Удобные шаблоны" },
  { id: 72, author: "user70", answer: "Хорошая система комментариев" },
  { id: 73, author: "user71", answer: "Быстрое подтверждение действий" },
  { id: 74, author: "user72", answer: "Удобные напоминания" },
  { id: 75, author: "user73", answer: "Хорошая интеграция с соцсетями" },
  { id: 76, author: "user74", answer: "Быстрое скачивание файлов" },
  { id: 77, author: "user75", answer: "Удобная система закладок" },
  { id: 78, author: "user76", answer: "Хорошая система статистики" },
  { id: 79, author: "user77", answer: "Быстрое создание аккаунта" },
  { id: 80, author: "user78", answer: "Удобные настройки приватности" },
  { id: 81, author: "user79", answer: "Хорошая система тегов" },
  { id: 82, author: "user80", answer: "Быстрое изменение профиля" },
  { id: 83, author: "user81", answer: "Удобные уведомления на email" },
  { id: 84, author: "user82", answer: "Хорошая система купонов" },
  { id: 85, author: "user83", answer: "Быстрое пополнение баланса" },
  { id: 86, author: "user84", answer: "Удобная система возвратов" },
  { id: 87, author: "user85", answer: "Хорошая программа лояльности" },
  { id: 88, author: "user86", answer: "Быстрое оформление подписки" },
  { id: 89, author: "user87", answer: "Удобные условия доставки" },
  { id: 90, author: "user88", answer: "Хорошая система скидок" },
  { id: 91, author: "user89", answer: "Быстрое оформление возврата" },
  { id: 92, author: "user90", answer: "Удобные способы оплаты" },
  { id: 93, author: "user91", answer: "Хорошая система кэшбэка" },
  { id: 94, author: "user92", answer: "Быстрое подтверждение оплаты" },
  { id: 95, author: "user93", answer: "Удобные условия гарантии" },
  { id: 96, author: "user94", answer: "Хорошая система бонусов" },
  { id: 97, author: "user95", answer: "Быстрое оформление гарантии" },
  { id: 98, author: "user96", answer: "Удобные условия рассрочки" },
  { id: 99, author: "user97", answer: "Хорошая система рейтингов" },
  { id: 100, author: "user98", answer: "Быстрое оформление кредита" },
  { id: 101, author: "user99", answer: "Удобные условия страхования" },
  { id: 102, author: "user100", answer: "Хорошая система cashback" },
  { id: 103, author: "user101", answer: "Быстрое оформление страховки" },
  { id: 104, author: "user102", answer: "Удобные условия обмена" },
  { id: 105, author: "user103", answer: "Хорошая система cashback" },
  { id: 106, author: "user104", answer: "Быстрое оформление обмена" },
  { id: 107, author: "user105", answer: "Удобные условия доставки" },
  { id: 108, author: "user106", answer: "Хорошая система кэшбэка" },
  { id: 109, author: "user107", answer: "Быстрое оформление доставки" },
  { id: 110, author: "user108", answer: "Удобные условия самовывоза" },
  { id: 111, author: "user109", answer: "Хорошая система промокодов" },
  { id: 112, author: "user110", answer: "Быстрое оформление самовывоза" },
  { id: 113, author: "user111", answer: "Удобные условия примерки" },
  { id: 114, author: "user112", answer: "Хорошая система акций" },
  { id: 115, author: "user113", answer: "Быстрое оформление примерки" },
  { id: 116, author: "user114", answer: "Удобные условия тест-драйва" },
  { id: 117, author: "user115", answer: "Хорошая система распродаж" },
  { id: 118, author: "user116", answer: "Быстрое оформление тест-драйва" },
  { id: 119, author: "user117", answer: "Удобные условия аренды" },
  { id: 120, author: "user118", answer: "Хорошая система скидок" },
  { id: 121, author: "user119", answer: "Быстрое оформление аренды" },
  { id: 122, author: "user120", answer: "Удобные условия лизинга" },
  { id: 123, author: "user121", answer: "Хорошая система бонусов" },
  { id: 124, author: "user122", answer: "Быстрое оформление лизинга" },
  { id: 125, author: "user123", answer: "Удобные условия кредита" },
  { id: 126, author: "user124", answer: "Хорошая система кэшбэка" },
  { id: 127, author: "user125", answer: "Быстрое оформление кредита" },
  { id: 128, author: "user126", answer: "Удобные условия ипотеки" },
  { id: 129, author: "user127", answer: "Хорошая система cashback" },
  { id: 130, author: "user128", answer: "Быстрое оформление ипотеки" },
  { id: 131, author: "user129", answer: "Удобные условия вклада" },
  { id: 132, author: "user130", answer: "Хорошая система процентов" },
  { id: 133, author: "user131", answer: "Быстрое оформление вклада" },
  { id: 134, author: "user132", answer: "Удобные условия инвестиций" },
  { id: 135, author: "user133", answer: "Хорошая система дивидендов" },
  { id: 136, author: "user134", answer: "Быстрое оформление инвестиций" },
  { id: 137, author: "user135", answer: "Удобные условия трейдинга" },
  { id: 138, author: "user136", answer: "Хорошая система аналитики" },
  { id: 139, author: "user137", answer: "Быстрое оформление трейдинга" },
  { id: 140, author: "user138", answer: "Удобные условия майнинга" },
  { id: 141, author: "user139", answer: "Хорошая система хешрейта" },
  { id: 142, author: "user140", answer: "Быстрое оформление майнинга" },
  { id: 143, author: "user141", answer: "Удобные условия стейкинга" },
  { id: 144, author: "user142", answer: "Хорошая система APR" },
  { id: 145, author: "user143", answer: "Быстрое оформление стейкинга" },
  { id: 146, author: "user144", answer: "Удобные условия фарминга" },
  { id: 147, author: "user145", answer: "Хорошая система APY" },
  { id: 148, author: "user146", answer: "Быстрое оформление фарминга" },
  { id: 149, author: "user147", answer: "Удобные условия NFT" },
  { id: 150, author: "user148", answer: "Хорошая система маркетплейса" }
];


let users = [
  {
    id: 1,
    login: "admin",
    password: "admin",
    email: "admin@gmail.com",
    role: "admin",
    isBlocked: false,
  },
];

let blackList = [];

app.get("/feedbacks", (req, res) => {
  const item = JSON.stringify(feedbacks);
  res.send(item);
});

app.get("/users", (req, res) => {
  const item = JSON.stringify(users);
  res.send(item);
});

app.post("/unblockUser/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (user) {
    user.isBlocked = false;
    blackList = blackList.filter(u => u.id !== userId);
    res.json(user);
  } else {
    res.status(404).send("Пользователь не найден");
  }
});

app.post("/feedbacks", (req, res) => {
  let maxId = 0;
  if (feedbacks.length > 0) {
    maxId = feedbacks[feedbacks.length - 1]["id"];
  }
  const newItem = {
    id: maxId + 1,
    author: req.body.author,
    answer: req.body.answer,
    mark: req.body.mark,
  };
  feedbacks.push(newItem);
  
  res.status(201).json(newItem);
});

app.delete("/feedbacks/:id", (req, res) => {
  feedbacks = feedbacks.filter((el) => {
    return el.id != parseInt(req.params.id);
  });

  res.send(feedbacks);
});

app.delete("/users/:id", (req, res) => {
  users = users.filter((el) => {
    return el.id != parseInt(req.params.id);
  });

  res.send(users);
});

app.post("/register", (req, res) => {
  const user = users.find((el) => el.login == req.body.username);

  if (!user) {
    const newUser = {
      id: users.length + 1,
      login: req.body.username,
      password: req.body.password,
      email: req.body.email,
      role: "user",
      isBlocked: false,
    };
    users.push(newUser);
    res.sendStatus(200);
  } else {
    res.sendStatus(409);
  }
});

app.get("/login/:username", (req, res) => {
  const currentUser = users.find((el) => el.login == req.params.username);
  const blackListNames = blackList.map((el) => el.login);
  if (currentUser && !blackListNames.includes(req.params.username))
    res.send(JSON.stringify(currentUser[0]));
  else res.sendStatus(409);
});

app.get("/profile/:username", (req, res) => {
  const currentUser = users.find((el) => el.login == req.params.username);
  res.send(JSON.stringify(currentUser));
});

app.put("/profile", (req, res) => {
  const currentUser = users.find((el) => {
    if (el.id == req.body.id) {
      (el.login = req.body.username),
        (el.password = req.body.password),
        (el.email = req.body.email);
      res.sendStatus(200);
    }
  });
});

app.post("/blockUser/:id", (req, res) => {
  console.log(req.body);
  const currentUser = users.find((el) => el.id == req.params.id);
  currentUser.isBlocked = true;
  blackList.push(currentUser);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

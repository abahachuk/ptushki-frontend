import { Scope } from "../permissions";

export const labels = {
  brandName: "Кольца Птушак",
  back: "Назад",
  form: {
    subtitleTop: "Центр Кольцевания Птиц",
    subtitleBottom: "при Академии наук Республики Беларусь",
    validation: {
      required: "Обязательное поле",
      email: "Некоррректный email"
    },
    phone: {
      label: "Номер телефона",
      placeholder: "Введите Ваш номер телефона"
    },
    email: {
      label: "Email",
      placeholder: "user_name@mail.com"
    },
    firstName: {
      label: "Имя",
      placeholder: "Введите имя"
    },
    lastName: {
      label: "Фамилия",
      placeholder: "Введите фамилию"
    },
    password: {
      label: "Пароль",
      placeholder: "******",
      newPasswordPlaceholder: "Придумайте пароль"
    }
  },
  resetPassword: {
    title: "Восстановление пароля",
    explanation:
      "Мы вышлем письмо на Вашу почту со ссылкой, которая поможет Вам создать новый пароль",
    sendLink: "Выслать ссылку",
    sendLinkAgain: "Выслать ссылку еще раз"
  },
  signIn: {
    title: "Войти",
    forgotPassword: "Забыли пароль?",
    rememberPassword: "Запомнить пароль"
  },
  signUp: {
    title: "Регистрация",
    rememberPassword: "Сохранить пароль",
    alreadyHavePassword: "У вас уже есть пароль?"
  },
  birdInfo: {
    euring: "Euring",
    addRing: "Добавить кольцо",
    photos: "Фотографии",
    export: "Экспортировать в .xls",
    edit: "Редактировать",
    back: "Назад",
    observationsHistory: "История наблюдений",
    delete: "Удалить",
    birdTitle: "Птица",
    ringingTitle: "Кольцевание и отлов",
    observationTime: "Время наблюдения",
    observationsTitle: "Последнее наблюдение птицы",
    circumstancesTitle: "Обстоятельства последнего наблюдения",
    bird: {
      neck: "Шея",
      leftWing: "Левое крыло",
      rightWing: "Правое крыло",
      saddle: "Клюв",
      leftAboveKnee: "Слева над коленом",
      rightAboveKnee: "Справа над коленом",
      leftBelowKnee: "Слева под коленом",
      rightBelowKnee: "Справа под коленом"
    }
  },
  createBird: {
    title: "Создание птицы",
    subtitle:
      "Нажмите на “+” для того, чтобы добавить кольцо или другую замеченную на птице метку.",
    saveBird: "Сохранить птицу",
    back: "Назад",
    observations: "Наблюдения",
    observationsSubtitle:
      "Опишите птицу и условия, в которых вы её увидели. Вы можете скачать определитель птиц беларуси на florafauna.by, чтобы узнать вид.",
    circumstances: "Обстоятельства",
    circumstancesSubtitle:
      "Где и когда вы увидели птицу? Оставьте коментарий, если хотите что-то добавить."
  },
  observationInfo: {
    title: "Информация о наблюдении",
    subtitle:
      "Нажмите на “+” для того, чтобы добавить кольцо или другую замеченную на птице метку.",
    edit: "Редактировать",
    delete: "Удалить",
    back: "Назад",
    editObservation: "Редактировать наблюдение",
    observations: "Наблюдения",
    circumstances: "Обстоятельства"
  },
  addObservation: {
    title: "Добавление наблюдения",
    actionTitle: "Добавить наблюдение",
    subTitle:
      "Нажмите на “+” для того, чтобы добавить кольцо или другую замеченную на птице метку.",
    labelType: "Тип метки",
    number: "Номер",
    observationsTitle: "Наблюдения",
    observationsSubtitle:
      "Опишите птицу и условия, в которых вы её увидели. Вы можете скачать определить вид на florafauna.by",
    circumstancesTitle: "Обстоятельства",
    circumstancesSubtitle:
      "Где и когда вы увидели птицу? Оставьте коментарий, если хотите что-то добавить.",
    manipulationAndCatchTitle: "Манипуляции и отлов",
    observationsFields: {
      birdSpecies: "Вид птицы",
      birdSpeciesPlaceholder: "Выберите вид",
      sex: "Пол",
      sexPlaceholder: "Выберите пол",
      age: "Возраст",
      agePlaceholder: "Возраст",
      birdState: "Состояние птицы",
      birdStatePlaceholder: "Птица была",
      photos: "Фотографии",
      comment: "Комментарий",
      commentPlaceholder: "Ввести комментарий"
    },
    circumstancesFields: {
      country: "Страна",
      countryPlaceholder: "Выбрать страну",
      region: "Регион",
      regionPlaceholder: "Выбрать район",
      coordinates: "Координаты",
      coordinatesPlaceholder: "Координаты",
      latitude: "Широта",
      longitude: "Долгота",
      findOnMap: "Найти место на карте",
      timeAndDate: "Время/Дата",
      timeAndDatePlaceholder: "Введите примерное время и дату",
      timeDelta: "Погрешность времени",
      timeDeltaPlaceholder: "Погрешность времени"
    },
    manipulationAndCatchFields: {
      manipulated: "Проводились ли манипуляции с птицей?",
      manipulatedPlaceholder: "Выберите манипуляции с птицей",
      catchingMethod: "Методы отлова",
      catchingMethodPlaceholder: "Выберите метод отлова",
      movedBeforeTheCapture: "Проводилось ли перемещение с птицей?",
      movedBeforeTheCapturePlaceholder: "Выберите тип перемещения с птицей",
      catchingLures: "Приманки для отлова",
      catchingLuresPlaceholder: "Выберите приманки для отлова"
    },
    back: "Назад",
    sendObservation: "Отправить наблюдение",
    selectOnMap: "Выберите место на карте",
    setPlace: "Выбрать"
  },
  observations: {
    title: "Наблюдения"
  },
  importObservations: {
    back: "Назад",
    title: "Загрузка базы наблюдений",
    description:
      "Если вы загружаете базу впервые - скачайте шаблонный XLS файл и заполните необходимые поля, после этого загрузите таблицу в форму ниже",
    uploadTable: "Загрузить заполненную таблицу",
    dragFile: "Перетащите файл со списком наблюдений сюда",
    fileUploaded: "Ваш файл загружен",
    wrongFile: "Неверный формат файла",
    or: "или",
    chooseFile: "Выберите файл",
    useTemplate: "Используйте шаблон, доступный для скачивания ниже",
    chooseAnotherFile: "Выберите другой файл",
    cancel: "Отменить",
    supportedFormats: "Поддерживаемые форматы: .xls",
    addToDatabase: "Добавить в базу",
    insertEuring: "Вставить коды EURING",
    insertCodesHere: "Вставьте коды сюда",
    loadToDatabase: "Загрузить в базу",
    tableTemplateTitle: "Шаблон таблицы",
    tableTemplateDescription:
      "Чтобы ваши данные корректно отобразились на сайте, скачайте и заполните эталонный excel-файл",
    tableTemplateButtonCaption: "Скачать файл"
  },
  aboutUs: {
    title: "О нас",
    header: "О центре кольцевания",
    belorussianRingCenterHeading: "Белорусский центр кольцевания птиц",
    belorussianRingCenterContentFirst:
      "Входит в состав лаборатории организации ГНПО НПЦ НАН Беларуси по биоресурсам и координирует работу в области кольцевания птиц в Беларуси.",
    belorussianRingCenterContentSecond:
      "В центре, с помощью кольцевания, мы отслеживаем миграции, мониторим численность, и даем оценки выживаемости и продолжительности жизни птиц в Беларуси.",
    tasksHeading: "Задачи которые мы выполняем",
    taskOneHeading: "Ведем базу данных наблюдений птиц",
    taskOneContent:
      "Собираем, обрабатываем данные по возвратам окольцованных птиц на территории Беларуси и зарубежных стран, анализируем полученную информацию и публикуем ежегодные отчеты.",
    taskTwoHeading:
      "Координируем работу по кольцеванию и цветному мечению птиц",
    taskTwoContent:
      "Регулярно обновляем банк орнитологических металлических и цветных колец, выдаем кольца волонтерам и работникам центра. Консультируем, проводим инструктаж и обучение волонтеров.",
    taskThreeHeading: "Сотрудничаем с зарубежными организациями",
    taskThreeContent:
      "Обмениваемся информацией с зарубежными центрами кольцевания и с Европейским союзом кольцевания птиц (EURING).",
    purposeHeading: "Для чего нужно кольцевание",
    purposeContentFirst:
      "Ученые орнитологи помечают птиц специальными пластиковыми или металлическими кольцами, чтобы регистрировать нахождение птицы в разных местах и делать выводы о развитии популяции.",
    purposeContentSecond:
      "В зависимости от полученных данных,   экологи принимают решения по поддержанию популяции на необходимом уровне.",
    photos: "Фотографии",
    contactInformation: "Контактная информация",
    postAddressHeading: "Почтовый адрес",
    postAddressContent:
      "Центр кольцевания птиц, Ул.Академическая - 27, 220072 Минск, Беларусь",
    emailHeading: "Электронная почта",
    emailContent: "bym.minsk@gmail.com",
    phoneHeading: "Телефон",
    phoneContent: "+375 17 284-25-04",
    managerHeading: "Руководитель центра кольцевания птиц",
    managerContent:
      "Богданович Иван Александрович, научный сотрудник лаборатории орнитологии",
    employeeHeading: "Сотрудник центра кольцевания птиц",
    employeeContent:
      "Павлющик Татьяна Евгеньевна, научный сотрудник лаборатории орнитологии"
  },
  addBird: {
    title: "Добавить птицу",
    actionTitle: "Добавить птицу"
  },
  birds: {
    title: "Птицы"
  },
  viewMode: {
    euRingAndTitle: "EURing + Название"
  },
  lang: {
    rus: "Рус",
    eng: "Eng",
    by: "Бел"
  },
  species: "Вид",
  speciesMentioned: "Вид по информатору",
  circumstances: "Обстоятельства",
  circumstancesPresumed: "Предполагаемые обстоятельства",
  sex: "Пол",
  sexMentioned: "Пол по информатору",
  age: "Возраст",
  ageMentioned: "Возраст по информатору",
  generalIdentificationMethod: "Основной метод идентификации",
  status: "Статус",
  condition: "Состояние",
  date: "Время/Дата",
  accuracyOfDate: "Точность времени/даты",
  remark: "Комментарий",
  placeName: "Место",
  accuracyOfCoordinates: "Точность координат",
  direction: "Направление",
  distance: "Удаленность от первого наблюдения",
  finder: "Наблюдатель",
  elapsedTime: "Время с первого наблюдения",
  loading: "Загрузка...",
  of: "из",
  verification: {
    title: "Модерация",
    verified: "Принят",
    rejected: "Отклонен",
    pending: "Ожидает модерации"
  },
  idx: "#",
  yes: "Да",
  no: "Нет",
  add: "Добавить",
  noData: "Нет данных",
  copyright: "© 2019 Ptushki. Все права защищены.",
  filter: "Фильтр",
  clearFilters: "Сбросить все фильтры",
  clear: "Сбросить",
  selectAll: "Выбрать все",
  search: "Поиск",
  show: "Показать",
  selected: "Выбрано",
  ofBirds: "птиц",
  columns: "Колонки",
  import: "Импорт",
  importData: "Загрузить данные",
  export: "Экспорт",
  exportData: "Экспортировать данные",
  logout: "Выйти",
  manipulated: "Манипуляции",
  movedBeforeTheCapture: "Передвижение до отлова",
  catchingMethod: "Способ отлова",
  catchingLures: "Приманки для отлова",
  pullusAge: "Возраст птенца",
  accuracyOfPullusAge: "Точность возраста птенца",
  ring: "Кольцо по информатору",
  degreeSymbol: "°",
  km: "км",
  days: "д",
  actionButtonTitle: "Невозможно изменить наблюдение, принятое модератором",
  createPage: {
    [Scope.observations]: {
      send: "Отправить наблюдение",
      title: "Добавление наблюдения",
      subTitle:
        "Нажмите на “+” для того, чтобы добавить кольцо или другую замеченную на птице метку.",
      circumstancesTitle: "Обстоятельства",
      circumstancesSubtitle:
        "Где и когда вы увидели птицу? Оставьте коментарий, если хотите что-то добавить.",
      observationsTitle: "Наблюдения",
      observationsSubtitle:
        "Опишите птицу и условия, в которых вы её увидели. Вы можете скачать определить вид на florafauna.by"
    },
    [Scope.birds]: {
      send: "Сохранить птицу",
      title: "Создание птицы",
      subTitle:
        "Нажмите на “+” для того, чтобы добавить кольцо или другую замеченную на птице метку.",
      circumstancesTitle: "Обстоятельства последнего наблюдения",
      circumstancesSubtitle:
        "Где и когда вы увидели птицу? Оставьте коментарий, если хотите что-то добавить.",
      observationsTitle: "Последнее наблюдение птицы",
      observationsSubtitle:
        "Опишите птицу и условия, в которых вы её увидели. Вы можете скачать определитель птиц беларуси на florafauna.by, чтобы узнать вид."
    }
  },
  tableHeader: {
    [Scope.observations]: {
      title: "Наблюдения",
      actionTitle: "Добавить птицу"
    },
    [Scope.birds]: {
      title: "Птицы",
      actionTitle: "Добавить наблюдение"
    }
  },
  infoPage: {
    [Scope.observations]: {
      edit: "Редактировать наблюдение",
      title: "Информация о наблюдении",
      circumstancesTitle: "Обстоятельства",
      circumstancesSubtitle:
        "Где и когда вы увидели птицу? Оставьте коментарий, если хотите что-то добавить.",
      observationsTitle: "Наблюдения",
      observationsSubtitle:
        "Опишите птицу и условия, в которых вы её увидели. Вы можете скачать определить вид на florafauna.by"
    },
    [Scope.birds]: {
      edit: "Редактировать птицу",
      title: "Информация о птице",
      circumstancesTitle: "Обстоятельства последнего наблюдения",
      circumstancesSubtitle:
        "Где и когда вы увидели птицу? Оставьте коментарий, если хотите что-то добавить.",
      observationsTitle: "Последнее наблюдение птицы",
      observationsSubtitle:
        "Опишите птицу и условия, в которых вы её увидели. Вы можете скачать определитель птиц беларуси на florafauna.by, чтобы узнать вид.",
      history: "История наблюдений"
    }
  },
  buttons: {
    back: "Назад",
    edit: "Редактировать",
    delete: "Удалить",
    export: "Экспортировать в .xls"
  }
} as const;

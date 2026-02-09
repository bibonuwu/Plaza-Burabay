/* main.js — sticky header, drawer menu, scroll-reveal, page fade
   + i18n (RU/KK/EN) with localStorage persistence.
*/

(function () {
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  const I18N = {
    ru: {
      "nav.hotel": "Hotel",
      "nav.rooms": "Rooms",
      "nav.spa": "SPA & Wellness",
      "nav.conf": "Конференц-зал",
      "nav.rules": "Правила",
      "nav.contacts": "Контакты",
      "nav.menu": "Меню",
      "nav.language": "Язык",
      "a11y.skip": "Пропустить к содержимому",

      "cta.whatsapp": "WhatsApp",
      "cta.call": "Позвонить",
      "cta.email": "Email",
      "cta.map": "2GIS",
      "cta.book": "Забронировать в WhatsApp",
      "cta.availability": "Уточнить наличие",
      "cta.ask": "Уточнить",
      "cta.openRooms": "Открыть номера",
      "cta.openSpa": "Открыть SPA",
      "cta.openConf": "Открыть зал",

      "meta.reception": "Ресепшн 24/7",
      "meta.checkin": "Заезд 14:00",
      "meta.checkout": "Выезд 12:00",
      "meta.wifi": "Wi-Fi free",
      "meta.times": "Check-in 14:00 · Check-out 12:00",
      "meta.wifiDetail": "Wi‑Fi: открытый · 5 этаж — “Султан Плаза 5”",

      "footer.nav": "Навигация",
      "footer.cta": "CTA",
      "footer.social": "Соцсети",

      "contacts.addressLabel": "Адрес",
      "contacts.phoneLabel": "Телефон",
      "contacts.emailLabel": "Email",

      "hotel.hero.title": "Премиальный отдых в Бурабае",
      "hotel.hero.lead": "Для спокойного отдыха в Бурабае. Детали — в WhatsApp.",
      "hotel.about.title": "Об отеле",
      "hotel.about.p1": "Лаконичный комфорт и быстрый контакт — всё важное без лишних шагов.",
      "hotel.about.p2": "Ресторан 13:00–00:00 (меню — по запросу: фото/PDF).",
      "hotel.about.li1": "SPA: бассейн/хаммам 09:00–22:00, входит в стоимость + ингаляция + магнитотерапия",
      "hotel.about.li2": "Детская комната: 6 этаж",
      "hotel.about.li3": "Прогулочная зона за отелем",
      "hotel.sections.title": "Hotel · Wellness · Events",
      "hotel.sections.lead": "Секции — быстро, чисто, без лишнего.",
      "hotel.sections.rooms": "Категории и цены (переключатель питания).",
      "hotel.sections.spa": "Входит в стоимость: бассейн, хаммам, процедуры.",
      "hotel.sections.conf": "30 человек · проектор · микрофон · Wi-Fi.",
      "hotel.add.title": "Дополнительно",
      "hotel.add.walk": "Прогулочная зона за отелем",
      "hotel.add.pool": "Внутренний бассейн",
      "hotel.add.kids": "Детская комната/площадка",
      "hotel.add.bbq": "Терраса/BBQ",

      "rooms.title": "Номера",
      "rooms.lead": "Выберите питание — цена обновится сразу.",
      "rooms.toggle.label": "Питание:",
      "rooms.toggle.breakfast": "Завтрак",
      "rooms.toggle.full": "Полный пансион",
      "rooms.toggle.hint": "Переключайте одним нажатием.",
      "rooms.badge.breakfast": "Завтрак включён",
      "rooms.perNight": "тг / ночь",
      "rooms.balcony": "Балкон",
      "rooms.onRequest": "По запросу",
      "rooms.eq.cos": "Косметика",
      "rooms.eq.tv": "ТВ",
      "rooms.eq.dryer": "Фен",
      "rooms.eq.kettle": "Чайник",
      "rooms.eq.safe": "Сейф и т.д.",
      "rooms.extraBedTitle": "Доп. кровать",
      "rooms.extraBedText": "До 16 лет — 15 000 тг/ночь.",

      "rooms.r1.name": "Стандарт",
      "rooms.r1.cap": "2 взрослых + дети до 6",
      "rooms.r2.name": "Де-люкс твин",
      "rooms.r2.cap": "2 взрослых + дети до 6",
      "rooms.r3.name": "Семейный",
      "rooms.r3.cap": "3 взрослых или 2+1 подросток",
      "rooms.r4.name": "Люкс",
      "rooms.r4.cap": "Спальня + гостиная",
      "rooms.r4.minibar": "Мини-бар",
      "rooms.r5.name": "Коттедж",
      "rooms.r5.lead": "Данные — по запросу.",

      "spa.title": "SPA & Wellness",
      "spa.lead": "Бассейн и хаммам входят в стоимость. Прайс на доп. услуги — в WhatsApp.",
      "spa.included": "Включено",
      "spa.services": "Услуги",
      "spa.hours": "Время работы",
      "spa.extra": "Дополнительно",
      "spa.inc.pool": "Бассейн",
      "spa.inc.hammam": "Хаммам",
      "spa.inc.inhalation": "Ингаляция",
      "spa.inc.magneto": "Магнитотерапия",
      "spa.srv.massage": "Массаж",
      "spa.srv.sauna": "Сауна",
      "spa.srv.pool": "Бассейн",
      "spa.time": "09:00–22:00",
      "spa.extra.towels": "Полотенца",
      "spa.extra.changing": "Раздевалка",
      "spa.cta.price": "Запросить прайс в WhatsApp",
      "spa.gallery.pool": "Бассейн",
      "spa.gallery.hammam": "Хаммам",
      "spa.gallery.massage": "Массаж",

      "conf.title": "Конференц-зал",
      "conf.lead": "Для встреч, презентаций и камерных мероприятий.",
      "conf.capacity.k": "Вместимость",
      "conf.capacity.v": "30 человек",
      "conf.seating.k": "Рассадки",
      "conf.seating.v": "класс / П-форма",
      "conf.tech.k": "Техника",
      "conf.tech.v": "проектор, микрофон, Wi‑Fi",
      "conf.gallery.cap": "30 · проектор · микрофон · Wi‑Fi",
      "conf.price.k": "Цена",
      "conf.price.v": "50 000 тг до 18:00",
      "conf.catering.k": "Кофе-брейк/кейтеринг",
      "conf.catering.v": "да",
      "conf.cta": "Запросить бронь зала",

      "rules.title": "Правила",
      "rules.lead": "Коротко и по делу.",
      "rules.r1.t": "Ресепшн",
      "rules.r1.v": "24/7",
      "rules.r2.t": "Курение",
      "rules.r2.v": "запрещено",
      "rules.r3.t": "Pet-friendly",
      "rules.r3.v": "нет",
      "rules.r4.t": "Тишина",
      "rules.r4.v": "с 23:00",
      "rules.r5.t": "Wi‑Fi",
      "rules.r5.v": "открытый; 5 этаж — «Султан Плаза 5»",
      "rules.r6.t": "Уборка",
      "rules.r6.v": "ежедневно после 15:00–16:00",
      "rules.r7.t": "Предоплата",
      "rules.r7.v": "30 000 тг",
      "rules.r8.t": "Оплата",
      "rules.r8.v": "наличные / карта / QR",
      "rules.r9.t": "Отмена",
      "rules.r9.v": "возврата нет, только перенос даты",
      "rules.r10.t": "Check‑in / Check‑out",
      "rules.r10.v": "14:00 / 12:00",
      "rules.r11.t": "Ранний/поздний выезд",
      "rules.r11.v": "+50% от цены номера",
      "rules.r12.t": "Прачечная",
      "rules.r12.v": "через ресепшен (цены фото)",
      "rules.r13.t": "Трансфер",
      "rules.r13.v": "нет",

      "contacts.title": "Контакты",
      "contacts.lead": "Свяжитесь удобным способом.",
      "contacts.addr.k": "Адрес",
      "contacts.addr.v": "Санаторий Светлый 39Б",
      "contacts.tel.k": "Телефон",
      "contacts.email.k": "Email",
      "contacts.wa.k": "WhatsApp",
      "contacts.ig.k": "Instagram",
      "contacts.btn.map": "Открыть в 2GIS",
      "contacts.btn.wa": "Написать в WhatsApp",
      "contacts.btn.call": "Позвонить",
      "contacts.map.caption": "Статичная карта (плейсхолдер без API)"
    },

    kk: {
      "nav.hotel": "Қонақ үй",
      "nav.rooms": "Нөмірлер",
      "nav.spa": "SPA & Wellness",
      "nav.conf": "Конференц-зал",
      "nav.rules": "Ережелер",
      "nav.contacts": "Байланыс",
      "nav.menu": "Мәзір",
      "nav.language": "Тіл",
      "a11y.skip": "Мазмұнға өту",

      "cta.whatsapp": "WhatsApp",
      "cta.call": "Қоңырау",
      "cta.email": "Email",
      "cta.map": "2GIS",
      "cta.book": "WhatsApp арқылы брондау",
      "cta.availability": "Бос орын сұрау",
      "cta.ask": "Сұрау",
      "cta.openRooms": "Нөмірлер",
      "cta.openSpa": "SPA",
      "cta.openConf": "Зал",

      "meta.reception": "Ресепшн 24/7",
      "meta.checkin": "Кіру 14:00",
      "meta.checkout": "Шығу 12:00",
      "meta.wifi": "Wi‑Fi free",
      "meta.times": "Check-in 14:00 · Check-out 12:00",
      "meta.wifiDetail": "Wi‑Fi: ашық · 5-қабат — “Султан Плаза 5”",

      "footer.nav": "Навигация",
      "footer.cta": "CTA",
      "footer.social": "Әлеуметтік желі",

      "contacts.addressLabel": "Мекенжай",
      "contacts.phoneLabel": "Телефон",
      "contacts.emailLabel": "Email",

      "hotel.hero.title": "Бурабайдағы премиум демалыс",
      "hotel.hero.lead": "Бурабайда жайлы демалыс. Толық ақпарат — WhatsApp-та.",
      "hotel.about.title": "Қонақ үй туралы",
      "hotel.about.p1": "Ыңғайлы минимализм, түсінікті шарттар және жылдам байланыс.",
      "hotel.about.p2": "Мейрамхана 13:00–00:00 (мәзір — сұрау бойынша: фото/PDF).",
      "hotel.about.li1": "SPA: бассейн/хаммам 09:00–22:00, құнына кіреді + ингаляция + магнитотерапия",
      "hotel.about.li2": "Балалар бөлмесі: 6-қабат",
      "hotel.about.li3": "Қонақ үй артында серуен аймағы",
      "hotel.sections.title": "Hotel · Wellness · Events",
      "hotel.sections.lead": "Негізгі бөлімдер — артықсыз, бірден.",
      "hotel.sections.rooms": "Санаттар мен бағалар.",
      "hotel.sections.spa": "Құнына кіреді: бассейн, хаммам, процедуралар.",
      "hotel.sections.conf": "30 адам · проектор · микрофон · Wi‑Fi.",
      "hotel.add.title": "Қосымша",
      "hotel.add.walk": "Қонақ үй артында серуен аймағы",
      "hotel.add.pool": "Ішкі бассейн",
      "hotel.add.kids": "Балалар бөлмесі/алаңы",
      "hotel.add.bbq": "Терраса/BBQ",

      "rooms.title": "Нөмірлер",
      "rooms.lead": "Тамақтануды таңдаңыз — баға бірден жаңарады.",
      "rooms.toggle.label": "Тамақ:",
      "rooms.toggle.breakfast": "Таңғы ас",
      "rooms.toggle.full": "Толық пансион",
      "rooms.toggle.hint": "Бір басумен ауыстырыңыз.",
      "rooms.badge.breakfast": "Таңғы ас кіреді",
      "rooms.perNight": "тг / түн",
      "rooms.balcony": "Балкон",
      "rooms.onRequest": "Сұрау бойынша",
      "rooms.eq.cos": "Косметика",
      "rooms.eq.tv": "ТВ",
      "rooms.eq.dryer": "Фен",
      "rooms.eq.kettle": "Шәйнек",
      "rooms.eq.safe": "Сейф және т.б.",
      "rooms.extraBedTitle": "Қосымша төсек",
      "rooms.extraBedText": "16 жасқа дейін — 15 000 тг/түн.",

      "rooms.r1.name": "Стандарт",
      "rooms.r1.cap": "2 ересек + 6 жасқа дейін",
      "rooms.r2.name": "Де-люкс twin",
      "rooms.r2.cap": "2 ересек + 6 жасқа дейін",
      "rooms.r3.name": "Отбасылық",
      "rooms.r3.cap": "3 ересек немесе 2+1 жасөспірім",
      "rooms.r4.name": "Люкс",
      "rooms.r4.cap": "Жатын бөлме + қонақ бөлме",
      "rooms.r4.minibar": "Мини-бар",
      "rooms.r5.name": "Коттедж",
      "rooms.r5.lead": "Деректер — сұрау бойынша.",

      "spa.title": "SPA & Wellness",
      "spa.lead": "Бассейн мен хаммам құнына кіреді. Қосымша қызметтер прайсы — WhatsApp-та.",
      "spa.included": "Құнына кіреді",
      "spa.services": "Қызметтер",
      "spa.hours": "Жұмыс уақыты",
      "spa.extra": "Қосымша",
      "spa.inc.pool": "Бассейн",
      "spa.inc.hammam": "Хаммам",
      "spa.inc.inhalation": "Ингаляция",
      "spa.inc.magneto": "Магнитотерапия",
      "spa.srv.massage": "Массаж",
      "spa.srv.sauna": "Сауна",
      "spa.srv.pool": "Бассейн",
      "spa.time": "09:00–22:00",
      "spa.extra.towels": "Сүлгілер",
      "spa.extra.changing": "Киім ауыстыру бөлмесі",
      "spa.cta.price": "Прайсты WhatsApp-та сұрау",
      "spa.gallery.pool": "Бассейн",
      "spa.gallery.hammam": "Хаммам",
      "spa.gallery.massage": "Массаж",

      "conf.title": "Конференц-зал",
      "conf.lead": "Кездесу, презентация және шағын іс-шараларға.",
      "conf.capacity.k": "Сыйымдылық",
      "conf.capacity.v": "30 адам",
      "conf.seating.k": "Отырғызу",
      "conf.seating.v": "сынып / П-түрі",
      "conf.tech.k": "Техника",
      "conf.tech.v": "проектор, микрофон, Wi‑Fi",
      "conf.gallery.cap": "30 · проектор · микрофон · Wi‑Fi",
      "conf.price.k": "Баға",
      "conf.price.v": "18:00 дейін 50 000 тг",
      "conf.catering.k": "Кофе-брейк/кейтеринг",
      "conf.catering.v": "иә",
      "conf.cta": "Залды брондау сұрау",

      "rules.title": "Ережелер",
      "rules.lead": "Қысқа әрі нақты.",
      "rules.r1.t": "Ресепшн",
      "rules.r1.v": "24/7",
      "rules.r2.t": "Темекі",
      "rules.r2.v": "тыйым салынған",
      "rules.r3.t": "Pet-friendly",
      "rules.r3.v": "жоқ",
      "rules.r4.t": "Тыныштық",
      "rules.r4.v": "23:00-ден бастап",
      "rules.r5.t": "Wi‑Fi",
      "rules.r5.v": "ашық; 5-қабат — «Султан Плаза 5»",
      "rules.r6.t": "Жинау",
      "rules.r6.v": "күнде 15:00–16:00 кейін",
      "rules.r7.t": "Алдын ала төлем",
      "rules.r7.v": "30 000 тг",
      "rules.r8.t": "Төлем",
      "rules.r8.v": "қолма-қол / карта / QR",
      "rules.r9.t": "Бас тарту",
      "rules.r9.v": "қайтарым жоқ, тек күнін ауыстыру",
      "rules.r10.t": "Кіру / шығу",
      "rules.r10.v": "14:00 / 12:00",
      "rules.r11.t": "Ерте/кеш шығу",
      "rules.r11.v": "нөмір бағасының +50%",
      "rules.r12.t": "Кір жуу",
      "rules.r12.v": "ресепшн арқылы (бағасы фото)",
      "rules.r13.t": "Трансфер",
      "rules.r13.v": "жоқ",

      "contacts.title": "Байланыс",
      "contacts.lead": "Ыңғайлы тәсілмен хабарласыңыз.",
      "contacts.addr.k": "Мекенжай",
      "contacts.addr.v": "Санаторий Светлый 39Б",
      "contacts.tel.k": "Телефон",
      "contacts.email.k": "Email",
      "contacts.wa.k": "WhatsApp",
      "contacts.ig.k": "Instagram",
      "contacts.btn.map": "2GIS ашу",
      "contacts.btn.wa": "WhatsApp жазу",
      "contacts.btn.call": "Қоңырау шалу",
      "contacts.map.caption": "Статикалық карта (API жоқ)"
    },

    en: {
      "nav.hotel": "Hotel",
      "nav.rooms": "Rooms",
      "nav.spa": "SPA & Wellness",
      "nav.conf": "Conference",
      "nav.rules": "Rules",
      "nav.contacts": "Contacts",
      "nav.menu": "Menu",
      "nav.language": "Language",
      "a11y.skip": "Skip to content",

      "cta.whatsapp": "WhatsApp",
      "cta.call": "Call",
      "cta.email": "Email",
      "cta.map": "2GIS",
      "cta.book": "Book via WhatsApp",
      "cta.availability": "Check availability",
      "cta.ask": "Ask",
      "cta.openRooms": "View rooms",
      "cta.openSpa": "View SPA",
      "cta.openConf": "View hall",

      "meta.reception": "Reception 24/7",
      "meta.checkin": "Check-in 14:00",
      "meta.checkout": "Check-out 12:00",
      "meta.wifi": "Wi‑Fi free",
      "meta.times": "Check-in 14:00 · Check-out 12:00",
      "meta.wifiDetail": "Wi‑Fi: open · 5th floor — \"Sultan Plaza 5\"",

      "footer.nav": "Navigation",
      "footer.cta": "CTA",
      "footer.social": "Social",

      "contacts.addressLabel": "Address",
      "contacts.phoneLabel": "Phone",
      "contacts.emailLabel": "Email",

      "hotel.hero.title": "Premium rest in Burabay",
      "hotel.hero.lead": "For a calm stay in Burabay. Details — in WhatsApp.",
      "hotel.about.title": "About",
      "hotel.about.p1": "Minimal comfort, clear terms, and fast contact — without extra steps.",
      "hotel.about.p2": "Restaurant 13:00–00:00 (menu on request: photo/PDF).",
      "hotel.about.li1": "SPA: pool/hammam 09:00–22:00, included + inhalation + magnetotherapy",
      "hotel.about.li2": "Kids room: 6th floor",
      "hotel.about.li3": "Walking area behind the hotel",
      "hotel.sections.title": "Hotel · Wellness · Events",
      "hotel.sections.lead": "Key sections — clean, quick, consistent.",
      "hotel.sections.rooms": "Categories and prices (meal toggle).",
      "hotel.sections.spa": "Included: pool, hammam, therapies.",
      "hotel.sections.conf": "30 guests · projector · mic · Wi‑Fi.",
      "hotel.add.title": "Also",
      "hotel.add.walk": "Walking area behind the hotel",
      "hotel.add.pool": "Indoor pool",
      "hotel.add.kids": "Kids room/playground",
      "hotel.add.bbq": "Terrace/BBQ",

      "rooms.title": "Rooms",
      "rooms.lead": "Pick a meal plan — prices update instantly.",
      "rooms.toggle.label": "Meal plan:",
      "rooms.toggle.breakfast": "Breakfast",
      "rooms.toggle.full": "Full board",
      "rooms.toggle.hint": "One-tap switch.",
      "rooms.badge.breakfast": "Breakfast included",
      "rooms.perNight": "KZT / night",
      "rooms.balcony": "Balcony",
      "rooms.onRequest": "On request",
      "rooms.eq.cos": "Amenities",
      "rooms.eq.tv": "TV",
      "rooms.eq.dryer": "Hair dryer",
      "rooms.eq.kettle": "Kettle",
      "rooms.eq.safe": "Safe etc.",
      "rooms.extraBedTitle": "Extra bed",
      "rooms.extraBedText": "Up to 16 y.o. — 15,000 KZT/night.",

      "rooms.r1.name": "Standard",
      "rooms.r1.cap": "2 adults + kids under 6",
      "rooms.r2.name": "Deluxe twin",
      "rooms.r2.cap": "2 adults + kids under 6",
      "rooms.r3.name": "Family",
      "rooms.r3.cap": "3 adults or 2+1 teen",
      "rooms.r4.name": "Suite",
      "rooms.r4.cap": "Bedroom + living room",
      "rooms.r4.minibar": "Mini-bar",
      "rooms.r5.name": "Cottage",
      "rooms.r5.lead": "Details on request.",

      "spa.title": "SPA & Wellness",
      "spa.lead": "Pool and hammam are included. Extra services — price list in WhatsApp.",
      "spa.included": "Included",
      "spa.services": "Services",
      "spa.hours": "Hours",
      "spa.extra": "Extra",
      "spa.inc.pool": "Pool",
      "spa.inc.hammam": "Hammam",
      "spa.inc.inhalation": "Inhalation",
      "spa.inc.magneto": "Magnetotherapy",
      "spa.srv.massage": "Massage",
      "spa.srv.sauna": "Sauna",
      "spa.srv.pool": "Pool",
      "spa.time": "09:00–22:00",
      "spa.extra.towels": "Towels",
      "spa.extra.changing": "Changing room",
      "spa.cta.price": "Request price list in WhatsApp",
      "spa.gallery.pool": "Pool",
      "spa.gallery.hammam": "Hammam",
      "spa.gallery.massage": "Massage",

      "conf.title": "Conference hall",
      "conf.lead": "For meetings, presentations, and small events.",
      "conf.capacity.k": "Capacity",
      "conf.capacity.v": "30 guests",
      "conf.seating.k": "Seating",
      "conf.seating.v": "classroom / U-shape",
      "conf.tech.k": "Equipment",
      "conf.tech.v": "projector, microphone, Wi‑Fi",
      "conf.gallery.cap": "30 · projector · mic · Wi‑Fi",
      "conf.price.k": "Price",
      "conf.price.v": "50,000 KZT until 18:00",
      "conf.catering.k": "Coffee break/catering",
      "conf.catering.v": "yes",
      "conf.cta": "Request hall booking",

      "rules.title": "Rules",
      "rules.lead": "Clear and minimal.",
      "rules.r1.t": "Reception",
      "rules.r1.v": "24/7",
      "rules.r2.t": "Smoking",
      "rules.r2.v": "not allowed",
      "rules.r3.t": "Pet-friendly",
      "rules.r3.v": "no",
      "rules.r4.t": "Quiet hours",
      "rules.r4.v": "from 23:00",
      "rules.r5.t": "Wi‑Fi",
      "rules.r5.v": "open; 5th floor — “Султан Плаза 5”",
      "rules.r6.t": "Cleaning",
      "rules.r6.v": "daily after 15:00–16:00",
      "rules.r7.t": "Prepayment",
      "rules.r7.v": "30,000 KZT",
      "rules.r8.t": "Payment",
      "rules.r8.v": "cash / card / QR",
      "rules.r9.t": "Cancellation",
      "rules.r9.v": "no refund, date change only",
      "rules.r10.t": "Check‑in / out",
      "rules.r10.v": "14:00 / 12:00",
      "rules.r11.t": "Early/late",
      "rules.r11.v": "+50% of room rate",
      "rules.r12.t": "Laundry",
      "rules.r12.v": "via reception (prices photo)",
      "rules.r13.t": "Transfer",
      "rules.r13.v": "no",

      "contacts.title": "Contacts",
      "contacts.lead": "Reach us your way.",
      "contacts.addr.k": "Address",
      "contacts.addr.v": "Sanatoriy Svetly 39B",
      "contacts.tel.k": "Phone",
      "contacts.email.k": "Email",
      "contacts.wa.k": "WhatsApp",
      "contacts.ig.k": "Instagram",
      "contacts.btn.map": "Open in 2GIS",
      "contacts.btn.wa": "Message on WhatsApp",
      "contacts.btn.call": "Call",
      "contacts.map.caption": "Static map placeholder (no API)"
    }
  };

  function t(lang, key) {
    return (I18N[lang] && I18N[lang][key]) || (I18N.ru[key] || key);
  }

  function detectLang() {
    const saved = localStorage.getItem("lang");
    if (saved && I18N[saved]) return saved;

    const n = (navigator.language || "ru").toLowerCase();
    if (n.startsWith("kk") || n.startsWith("kz")) return "kk";
    if (n.startsWith("en")) return "en";
    return "ru";
  }

  function setLangIndicator(lang) {
    const current = qs("[data-lang-current]");
    if (current) current.textContent = (lang === "kk") ? "KZ" : lang.toUpperCase();
  }

  function applyLang(lang, opts = {}) {
    const force = Boolean(opts.force);
    const persist = opts.persist !== false;

    document.documentElement.lang = lang;
    if (persist) localStorage.setItem("lang", lang);
    setLangIndicator(lang);
    qsa("[data-lang]").forEach((btn) => {
      const isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    qsa("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(lang, key);
    });
  }

  function langUI() {
    const wrap = qs(".lang");
    const btn = qs("[data-lang-toggle]");
    const menu = qs("[data-lang-menu]");
    const langBtns = qsa("[data-lang]");

    const close = () => {
      if (!wrap) return;
      wrap.classList.remove("is-open");
      if (btn) btn.setAttribute("aria-expanded", "false");
      if (menu) menu.setAttribute("aria-hidden", "true");
    };
    const open = () => {
      if (!wrap) return;
      wrap.classList.add("is-open");
      if (btn) btn.setAttribute("aria-expanded", "true");
      if (menu) menu.setAttribute("aria-hidden", "false");
    };

    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        wrap.classList.contains("is-open") ? close() : open();
      });
    }

    document.addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (wrap && wrap.classList.contains("is-open")) {
        close();
        if (btn) btn.focus();
      }
    });

    langBtns.forEach((b) => {
      b.addEventListener("click", () => {
        const lang = b.getAttribute("data-lang");
        if (I18N[lang]) applyLang(lang, { force: true, persist: true });
        close();
      });
    });
  }

  function setYear() {
    const yearEl = qs("[data-year]");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function stickyHeader() {
    const header = qs("[data-header]");
    if (!header) return;

    let ticking = false;
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function mobileDrawer() {
    const burger = qs("[data-burger]");
    const drawer = qs("[data-drawer]");
    const closeBtns = qsa("[data-drawer-close]");
    const body = document.body;

    if (!burger || !drawer) return;

    const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const pageEls = [qs("header"), qs("main"), qs("footer"), qs(".mobile-actions")].filter(Boolean);
    let lastFocus = null;

    const setPageInert = (state) => {
      pageEls.forEach((el) => {
        if ("inert" in el) el.inert = state;
        if (state) el.setAttribute("aria-hidden", "true");
        else el.removeAttribute("aria-hidden");
      });
    };

    const getFocusableInPanel = () => Array.from(drawer.querySelectorAll(".drawer__panel " + focusableSelector));

    const open = () => {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
      body.classList.add("no-scroll");
      lastFocus = document.activeElement;
      setPageInert(true);
      window.requestAnimationFrame(() => {
        const focusable = getFocusableInPanel();
        if (focusable.length) focusable[0].focus();
      });
    };

    const close = () => {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      body.classList.remove("no-scroll");
      setPageInert(false);
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      } else {
        burger.focus();
      }
    };

    burger.addEventListener("click", () => drawer.classList.contains("is-open") ? close() : open());
    closeBtns.forEach((btn) => btn.addEventListener("click", close));

    window.addEventListener("keydown", (e) => {
      if (!drawer.classList.contains("is-open")) return;
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = getFocusableInPanel();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    qsa(".drawer .nav__link").forEach((a) => a.addEventListener("click", close));

    if (!qs("style[data-scroll-lock]")) {
      const style = document.createElement("style");
      style.setAttribute("data-scroll-lock", "true");
      style.textContent = `body.no-scroll{overflow:hidden;}`;
      document.head.appendChild(style);
    }
  }

  function setRevealDelays() {
    // Stagger reveal inside each section for a calmer, more “alive” feel.
    const groups = qsa("section, header, footer, .section, .container");
    groups.forEach((g) => {
      const els = qsa("[data-reveal]", g);
      els.forEach((el, idx) => {
        const d = Math.min(idx * 70, 420);
        el.style.setProperty("--reveal-delay", d + "ms");
      });
    });
  }

  function pageTransitions() {
    // Soft fade-out when navigating between .html pages (keeps the site feeling “alive”).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (navigator.connection && navigator.connection.saveData) return;
    if (navigator.connection && /(^|\\s)(2g|3g)(\\s|$)/i.test(navigator.connection.effectiveType || "")) return;

    qsa("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      // Ignore external + special protocols
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#") || href.startsWith("javascript:")) return;

      // Only internal page navigations
      if (!href.includes(".html")) return;

      // Respect target
      if (a.getAttribute("target") && a.getAttribute("target") !== "_self") return;

      a.addEventListener("click", (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        document.body.classList.add("is-leaving");
        window.setTimeout(() => { window.location.href = href; }, 180);
      });
    });

    // BFCache / back-forward fix
    window.addEventListener("pageshow", () => document.body.classList.remove("is-leaving"));
  }

  function lazyBackgrounds() {
    const items = qsa("[data-bg]");
    if (!items.length) return;

    const setBg = (el) => {
      const src = el.getAttribute("data-bg");
      if (!src) return;
      el.style.backgroundImage = `url('${src}')`;
      el.removeAttribute("data-bg");
    };

    if (!("IntersectionObserver" in window)) {
      items.forEach(setBg);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setBg(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "200px 0px", threshold: 0.01 });

    items.forEach((el) => io.observe(el));
  }

  function scrollReveal() {
    const items = qsa("[data-reveal]");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

    items.forEach((el) => io.observe(el));
  }

  function runIdle(fn) {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(fn, { timeout: 1000 });
    } else {
      window.setTimeout(fn, 1);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("is-loaded");
    setYear();
    stickyHeader();
    mobileDrawer();
    pageTransitions();

    const lang = detectLang();
    applyLang(lang, { persist: lang !== "ru" });
    langUI();

    runIdle(setRevealDelays);
    runIdle(scrollReveal);
    runIdle(lazyBackgrounds);
  });
})();

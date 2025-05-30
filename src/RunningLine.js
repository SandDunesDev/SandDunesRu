import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import crossIcon from "./cross.svg"; // SVG del botón de cierre
import "./RunningLine.css";

export default function RunningLine() {
  // Sustituye la definición anterior por esta:

  // ↓ AÑADE estas dos líneas junto a las otras constantes, encima de originalTextContent
const russianText =
  "как сделать открытку? → создай пару сам или доверься случайному выбору ⚄ → получи письмо с открыткой ";
const englishText =
  "craft a postcard → match two columns or go random ⚄ → get your card emailed to you ";

  const consentPart1 = "(нажимая на кнопку «send» ты соглашаешься с нашей ";
  const consentLinkText = "политикой конфиденциальности";
  const consentPart2 = ")";
  const mainSeparator = "\u00A0\u00A0\u00A0|\u00A0\u00A0\u00A0";

  const measuredTextRef = useRef(null);
  const [singlePhraseWidth, setSinglePhraseWidth] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const cls = "modal-open";
    const body = document.body;
    if (showModal) body.classList.add(cls);
    else body.classList.remove(cls);
    return () => body.classList.remove(cls);
  }, [showModal]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const AnimatedTextInstance = () => (
  <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
    {russianText}
    {consentPart1}
    <span
      className="privacy-policy-link-cursor"
      style={{ color: "#2580E6" }}
      onClick={openModal}
      role="link"
      tabIndex={0}
    >
      {consentLinkText}
    </span>
    {consentPart2}
    {mainSeparator}
    {englishText}
    {mainSeparator}
  </span>
);

  useEffect(() => {
    if (measuredTextRef.current) {
      setSinglePhraseWidth(measuredTextRef.current.offsetWidth);
    }
  }, []);

  return (
    <>
      <div className="running-line-container">
        <div
          style={{
            position: "absolute",
            visibility: "hidden",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <span
  ref={measuredTextRef}
  style={{
    fontFamily: "Roboto Mono, monospace",
    fontSize: 12,
    display: "inline-block",
  }}
>
  {russianText}
  {consentPart1}
  <span>{consentLinkText}</span>
  {consentPart2}
  {mainSeparator}
  {englishText}
  {mainSeparator}
</span>

        </div>

        {singlePhraseWidth > 0 && (
          <motion.div
            style={{
              display: "flex",
              width: `calc(${singlePhraseWidth}px * 2)`,
            }}
            animate={{ x: [0, -singlePhraseWidth] }}
            transition={{
              repeat: Infinity,
              duration: singlePhraseWidth / 35,
              ease: "linear",
            }}
          >
            <AnimatedTextInstance />
            <AnimatedTextInstance />
          </motion.div>
        )}
      </div>

      {showModal &&
        ReactDOM.createPortal(
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={closeModal}
                aria-label="Закрыть"
              >
                <img src={crossIcon} alt="Close" width={48} height={48} />
              </button>

              <h2>Политика конфиденциальности</h2>
              <SimpleBar className="modal-scrollable-text-content">
                <p className="modal-date-fixed">
  Дата последнего обновления: 22 мая 2025 года
</p>
<p>
  Мы уважаем вашу конфиденциальность и стремимся защищать личные данные, которые вы нам доверяете. Настоящая Политика конфиденциальности и обработки персональных данных (далее — «Политика») действует в отношении всех данных, которые sanddunes.ru и lovesanddunes.com (далее — «Сайт», «мы», «Компания») может получить о пользователе в процессе использования сайта, сервисов, продуктов и функций.
</p>
<ol>
  <li>
    <strong>Общие положения.</strong>
    <ul>
      <li>Настоящая Политика действует в отношении всех данных, которые sanddunes.ru и lovesanddunes.com (далее — «Сайт», «мы», «Компания») может получить о пользователе в процессе использования сайта, сервисов, продуктов и функций.</li>
      <li>Мы уважаем вашу конфиденциальность и стремимся защищать личные данные, которые вы нам доверяете.</li>
    </ul>
  </li>
  <li>
    <strong>Правовое основание обработки.</strong>
    <ul>
      <li>Обработка персональных данных осуществляется в соответствии с Конституцией РФ, ФЗ-152 «О персональных данных», иными нормативными актами.</li>
      <li>Предоставляя данные на сайте, пользователь подтверждает согласие с данной Политикой.</li>
    </ul>
  </li>
  <li>
    <strong>Какие данные мы собираем.</strong> Мы можем собирать и обрабатывать следующие категории данных:
    <ul>
      <li>Имя, e-mail, телефон (при подписке на рассылку или оформлении заказа);</li>
      <li>Информация о действиях пользователя на сайте (через cookies и аналитику);</li>
      <li>Данты для оформления заказов: ФИО, адрес, телефон, email, способы оплаты;</li>
      <li>Любая информация, предоставленная добровольно в форме обратной связи, опросах и т.п.</li>
    </ul>
  </li>
  <li>
    <strong>Цели обработки данных.</strong> Персональные данные используются исключительно для:
    <ul>
      <li>Регистрации и обслуживания пользователей;</li>
      <li>Отправки маркетинговых рассылок (с согласия);</li>
      <li>Выполнения заказов;</li>
      <li>Обратной связи и поддержки;</li>
      <li>Улучшения пользовательского опыта (аналитика, UX);</li>
      <li>Соблюдения законодательства РФ.</li>
    </ul>
  </li>
  <li>
    <strong>Рассылки и согласие.</strong>
    <ul>
      <li>Подписываясь на рассылку или оставляя данные в генераторе открыток, пользователь выражает согласие получать письма и материалы от бренда Sand Dunes.</li>
      <li>Пользователь вправе в любой момент отписаться от рассылки через соответствующую ссылку в письмах.</li>
    </ul>
  </li>
  <li>
    <strong>Cookies и аналитика.</strong>
    <ul>
      <li>Сайт использует cookies и аналитические инструменты (например, Яндекс.Метрика, Google Analytics) для улучшения работы сайта.</li>
      <li>Вы можете отключить cookies в настройках своего браузера, однако это может ограничить функциональность сайта.</li>
    </ul>
  </li>
  <li>
    <strong>Условия хранения и передачи данных.</strong>
    <ul>
      <li>Мы не передаём ваши данные третьим лицам, за исключением случаев, прямо предусмотренных законом (например, по запросу государственных органов).</li>
      <li>Данные хранятся на российских серверах в соответствии с законом.</li>
      <li>Срок хранения: до момента достижения целей обработки или отзыва согласия.</li>
    </ul>
  </li>
  <li>
    <strong>Защита персональных данных.</strong> Компания принимает все необходимые меры (организационные, технические и правовые) для обеспечения безопасности ваших данных и защиты от утечек, потерь, несанкционированного доступа и т.д.
  </li>
  <li>
    <strong>Права пользователя.</strong> Вы имеете право:
    <ul>
      <li>Запросить информацию об обработке своих данных;</li>
      <li>Отозвать согласие;</li>
      <li>Требовать удаления или изменения персональных данных;</li>
      <li>Направить жалобу в Роскомнадзор или в суд, если считаете, что ваши права нарушены.</li>
    </ul>
  </li>
  <li>
    <strong>Контакты оператора.</strong> По всем вопросам, связанным с обработкой персональных данных, вы можете связаться с нами:
    <br />
    Оператор: ИП Генералов Иван Геннадиевич
    <br />
    ИНН: 301726527527
    <br />
    ОГРНИП: 301726527527
    <br />
    Адрес: Россия, г. Москва, Большой Николопесковский переулок 13
    <br />
    Email:{" "}
    <a href="mailto:love@sanddunes.ru">love@sanddunes.ru</a>
    <br />
  </li>
</ol>
              </SimpleBar>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
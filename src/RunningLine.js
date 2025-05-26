
import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import crossIcon from "./cross.svg"; // SVG del botón de cierre
import "./RunningLine.css";

export default function RunningLine() {
  const originalTextContent =
    "crée une carte → assemble ou laisse le hasard faire ⚄ → reçois-la par e-mail  |  craft a postcard → match two columns or go random ⚄ → get your card emailed to you  |  как сделать открытку? → создай пару сам или доверься случайному выбору ⚄ → получи письмо с открыткой ";

  const consentPart1 =
    "(нажимая на кнопку «send» ты соглашаешься с нашей ";
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
      {originalTextContent}
      {consentPart1}
      <span
        className="privacy-policy-link-cursor"
        style={{ color: "#2580E6" }}
        onClick={openModal}
        role="link"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openModal();
          }
        }}
      >
        {consentLinkText}
      </span>
      {consentPart2}
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
            {originalTextContent}
            {consentPart1}
            <span>{consentLinkText}</span>
            {consentPart2}
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
          <div
            className="modal-overlay"
            onClick={closeModal}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()} 
            >
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
                Дата последнего обновления: 18 апреля 2025 года
              </p>

             
                <p>
                  Мы уважаем ваше право на конфиденциальность. Настоящая политика
                  описывает, как бренд&nbsp;Sand&nbsp;Dunes&nbsp;(далее&nbsp;—
                  «мы», «наш», «нас») обрабатывает и защищает персональные
                  данные, которые вы предоставляете нам при использовании сайта
                  sanddunes.ru и/или при подписке на нашу e-mail-рассылку.
                </p>
                <ol>
                  <li>
                    <strong>Какие данные мы собираем.</strong> Мы можем собирать
                    и обрабатывать следующие категории данных:
                    <ul>
                      <li>
                        Имя, адрес электронной почты — при подписке на рассылку
                        или отправке форм на сайте;
                      </li>
                      <li>
                        Данные об использовании сайта (через файлы cookie и
                        аналитику);
                      </li>
                      <li>
                        Иные сведения, которые вы добровольно предоставляете нам.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Как мы используем ваши данные.</strong> Персональные
                    данные используются исключительно для:
                    <ul>
                      <li>
                        Отправки информационных и/или маркетинговых писем
                        (только с вашего согласия);
                      </li>
                      <li>
                        Улучшения качества наших сервисов и коммуникаций;
                      </li>
                      <li>
                        Обратной связи, если вы оставили запрос через форму.
                      </li>
                    </ul>
                    Мы не передаём ваши данные третьим лицам без отдельного
                    согласия, за исключением случаев, предусмотренных
                    законодательством.
                  </li>
                  <li>
                    <strong>Правовые основания обработки.</strong> Обработка
                    осуществляется на основании:
                    <ul>
                      <li>
                        Вашего свободного, конкретного, информированного и
                        однозначного согласия на обработку персональных данных;
                      </li>
                      <li>
                        Действующего законодательства РФ, включая Федеральный
                        закон №152-ФЗ «О персональных данных».
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>E-mail-рассылка.</strong> Подписываясь на нашу
                    рассылку, вы соглашаетесь получать:
                    <ul>
                      <li>Новости бренда и клуба Sand&nbsp;Dunes;</li>
                      <li>Анонсы новых коллекций и мероприятий;</li>
                      <li>
                        Специальные предложения и персонализированные
                        рекомендации.
                      </li>
                    </ul>
                    Вы можете в любой момент отписаться, перейдя по ссылке внизу
                    любого письма.
                  </li>
                  <li>
                    <strong>Cookie-файлы и аналитика.</strong> Мы используем
                    файлы cookie для обеспечения корректной работы сайта и
                    анализа пользовательского опыта. Вы можете изменить
                    настройки cookie в своём браузере.
                  </li>
                  <li>
                    <strong>Как мы защищаем ваши данные.</strong> Мы применяем
                    актуальные технические и организационные меры для защиты
                    информации от несанкционированного доступа, изменения,
                    раскрытия или уничтожения.
                  </li>
                  <li>
                    <strong>Ваши права.</strong> Вы имеете право:
                    <ul>
                      <li>Запросить доступ к вашим данным;</li>
                      <li>Потребовать их исправления или удаления;</li>
                      <li>
                        Отозвать своё согласие на обработку в любой момент,
                        направив запрос на нашу почту:
                        love@sanddunes.ru.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Контакты.</strong> По всем вопросам, связанным с
                    обработкой персональных данных, вы можете связаться с нами:
                    <br />
                    E-mail:&nbsp;
                    <a href="mailto:love@sanddunes.ru">love@sanddunes.ru</a>
                    <br />
                    Сайт:&nbsp;
                    <a
                      href="https://sanddunes.ru"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://sanddunes.ru
                    </a>
                    <br />
                    Нажимая кнопку «Подписаться» (или устанавливая галочку в
                    форме), вы подтверждаете своё согласие с условиями данной
                    политики конфиденциальности и даёте согласие на обработку
                    персональных данных.
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

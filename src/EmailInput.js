import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./EmailInput.css";


import btnDefault from "../src/ButtonDefault.svg";
import btnFocused from "../src/ButtonFocused.svg";
import btnClicked from "../src/ButtonClicked.svg";
import spinner from "../src/spinner.svg";
import crossIcon from "../src/cross.svg"; 

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css'; 

export default function EmailInput({ selectedImageA, selectedImageB, onSuccess }) {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const cls = "modal-open";
    const body = document.body;
    if (showModal) body.classList.add(cls);
    else body.classList.remove(cls);
    return () => body.classList.remove(cls);
  }, [showModal]);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!email || !validateEmail(email)) {
      setHasError(true);
      return;
    }
    if (!selectedImageA || !selectedImageB) return;

    setClicked(true);
    setLoading(true);
    try {
      const response = await fetch("/api/send-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, selectedImageA, selectedImageB }),
      });
      const result = await response.json();
      if (response.ok && !result.error) {
        setEmail("");
        setHasError(false);
        onSuccess();
      } else {
        alert("Sending failed. Try again.");
      }
    } catch (err) {
      alert("Failed to send. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setClicked(false), 300);
    }
  };

  const getButtonImage = () => {
    if (loading) return spinner;
    if (clicked) return btnClicked;
    if (isHovered) return btnFocused;
    return btnDefault;
  };

  return (
    <>
      <div className="email-block">
        <div className="email-input-wrapper">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => { setIsFocused(true); setHasError(false); }}
            onBlur={() => setIsFocused(false)}
            className={`email-input ${hasError ? "error" : ""}`}
          />
          <div className="divider" />
          <button
            className="send-button"
            onClick={handleSubmit}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={loading}
          >
            <img
              src={getButtonImage()}
              alt="Send"
              className={loading ? "spinner" : "button-image"}
            />
          </button>
        </div>
        <p className="privacy-consent-text">
          Нажимая на кнопку, вы соглашаетесь с{" "}
          <span className="privacy-link" onClick={() => setShowModal(true)}>
            Политикой конфиденциальности
          </span>
        </p>
      </div>

      {showModal &&
        ReactDOM.createPortal(
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Закрыть"
              >
                <img src={crossIcon} alt="Close" /> 
              </button>

              <h2>Политика конфиденциальности</h2>
              <p className="modal-date-fixed"><strong>Дата последнего обновления: 18 апреля 2025 года</strong></p>

             
              <SimpleBar className="modal-scrollable-text-content">
                <p>
                  Мы уважаем ваше право на конфиденциальность. Настоящая политика описывает,
                  как бренд&nbsp;Sand Dunes&nbsp;(далее&nbsp;— «мы», «наш», «нас») обрабатывает и
                  защищает персональные данные, которые вы предоставляете нам при
                  использовании сайта sanddunes.ru и/или при подписке на нашу e-mail-рассылку.
                </p>
                <ol>
                  <li>
                    <strong>Какие данные мы собираем.</strong> Мы можем собирать и обрабатывать
                    следующие категории данных:
                    <ul>
                      <li>Имя, адрес электронной почты — при подписке на рассылку или отправке форм на сайте;</li>
                      <li>Данные об использовании сайта (через файлы cookie и аналитику);</li>
                      <li>Иные сведения, которые вы добровольно предоставляете нам.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Как мы используем ваши данные.</strong> Персональные данные
                    используются исключительно для:
                    <ul>
                      <li>Отправки информационных и/или маркетинговых писем (только с вашего согласия);</li>
                      <li>Улучшения качества наших сервисов и коммуникаций;</li>
                      <li>Обратной связи, если вы оставили запрос через форму.</li>
                    </ul>
                    Мы не передаём ваши данные третьим лицам без отдельного согласия, за
                    исключением случаев, предусмотренных законодательством.
                  </li>
                  <li>
                    <strong>Правовые основания обработки.</strong> Обработка осуществляется на
                    основании:
                    <ul>
                      <li>Вашего свободного, конкретного, информированного и однозначного согласия на обработку персональных данных;</li>
                      <li>Действующего законодательства РФ, включая Федеральный закон №152-ФЗ «О персональных данных».</li>
                    </ul>
                  </li>
                  <li>
                    <strong>E-mail-рассылка.</strong> Подписываясь на нашу рассылку, вы
                    соглашаетесь получать:
                    <ul>
                      <li>Новости бренда и клуба Sand Dunes;</li>
                      <li>Анонсы новых коллекций и мероприятий;</li>
                      <li>Специальные предложения и персонализированные рекомендации.</li>
                    </ul>
                    Вы можете в любой момент отписаться, перейдя по ссылке внизу любого
                    письма.
                  </li>
                  <li>
                    <strong>Cookie-файлы и аналитика.</strong> Мы используем файлы cookie для
                    обеспечения корректной работы сайта и анализа пользовательского опыта.
                    Вы можете изменить настройки cookie в своём браузere.
                  </li>
                  <li>
                    <strong>Как мы защищаем ваши данные.</strong> Мы применяем актуальные
                    технические и организационные меры для защиты информации от
                    несанкционированного доступа, изменения, раскрытия или уничтожения.
                  </li>
                  <li>
                    <strong>Ваши права.</strong> Вы имеете право:
                    <ul>
                      <li>Запросить доступ к вашим данным;</li>
                      <li>Потребовать их исправления или удаления;</li>
                      <li>Отозвать своё согласие на обработку в любой момент, направив запрос на нашу почту: love@sanddunes.ru.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Контакты.</strong> По всем вопросам, связанным с обработкой
                    персональных данных, вы можете связаться с нами:<br />
                    E-mail: <a href="mailto:love@sanddunes.ru">love@sanddunes.ru</a><br />
                    Сайт:&nbsp;<a href="https://sanddunes.ru" target="_blank" rel="noreferrer">https://sanddunes.ru</a><br />
                    Нажимая кнопку «Подписаться» (или устанавливая галочку в форме), вы
                    подтверждаете своё согласие с условиями данной политики
                    конфиденциальности и даёте согласие на обработку персональных данных.
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
import "./App.scss";
import React from "react";
import { AutosuggestSearch } from "ilw-autosuggest";

//import dataSource from "./datasources/serverFiltredDatasource";
// ? data source for server-side filtering and asking for data on every change. filters and sorters are commented

import dataSource from "./datasources/localFiltredDatasource";
// ? data source for client-side filtering and asking for data once, keeping it in memory

function App() {
  // ? url for pulling data goes there
  var url = "https://mocki.io/v1/95b0a9c4-2534-42e8-9a34-0c69eac2c9e7";

  return (
    <div className="App">
      <div className="heroFrame" id="sectionFirst">
        <h1 className="heroFrameHeader">
          Компонент autocomplete с пословными подсказками
        </h1>
        <AutosuggestSearch dataSource={dataSource(url)}></AutosuggestSearch>
        <a className="scrollDownText" href="#sectionSecond">
          Описание
        </a>
      </div>
      <div className="infoFrame" id="sectionSecond">
        <div className="infoBlockFunc">
          <h2 className="funcBlockHeader">Функционал</h2>
          <ol>
            <li>
              При нажатии на поле поиска появляется список пунктов, состоящий из
              стандартных полей либо релевантных к введённому поисковому
              запросу.
            </li>
            <li>
              При введении в поле поиска одной или нескольких букв, список
              предложенных вариантов включает в себя популярные запросы,
              содержащие введённый фрагмент. Eсли в первом предложенном варианте
              поисковый фрагмент находится не в начале запроса, он не
              предлагается к автозаполнению. Также среди найденных вариантов
              введённые фрагменты запроса выделяются, находись они в начале,
              середине или конце любого из слов.
            </li>
            <li>
              Первый из предложенных вариантов предлагается для автозаполнения,
              отображаясь серым текстом как подложка под вводимый в поле текст.
              Автозаполнение происходит пословно при нажатии на TAB.
            </li>
            <li>
              Если пользователь нажимает TAB для автозаполнения, или сам
              допечатывает слово, следующее за ним не предлагается к
              автозаполнению, пока пользователь не поставит пробел, разделяющий
              эти слова/фрагменты.
            </li>
          </ol>
        </div>
        <div className="infoBlockDev">
          <h2 className="devBlockHeader">Работа с компонентом</h2>
          Компонент в обязательном порядке принимает в свойство dataSource
          функцию, осуществляющую получение и передачу данных. На вход ей
          подаются введённые в поле поиска данные и таймштамп, позволяющий
          идентифицировать ответы на запросы, возвращать функция должна объект
          состоящий из переданного временного указателя (timeStamp) и данных
          (data).
        </div>
        <div className="infoBlockProps">
          <p>
            Компонент на данный момент опционально принимает в себя следующие
            пропсы:
          </p>
          <br />
          <ol>
            <li>width - по дефолту выставлено 300</li>
            <li>height - по дефолту выставлено 60</li>
            <li>fullWidthBool</li>
            <li>autoComplete</li>
            <li>autocompleteSize</li>
            <li>autoHighlight</li>
            <li>autoSelect</li>
            <li>blurOnSelect</li>
            <li>classes</li>
            <li>clearOnEscape</li>
            <li>disableCloseOnSelect</li>
            <li>disabled</li>
            <li>disableListWrap</li>
            <li>forcePopupIcon</li>
            <li>freeSolo - по дефолту указано true</li>
            <li>disablePortal - по дефолту указано true</li>
            <li>handleHomeEndKeys - по дефолту указано true</li>
            <br />
            <p>
              Информацию о их значении можно найти в
              <a href="https://mui.com/material-ui/api/autocomplete/">
                <u> руководстве по оригинальному компоненту.</u>
              </a>
            </p>
            <br />
            <li>
              debounceTime - по дефолту выставлено 150, отвечает за длину
              задержки ввода
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;

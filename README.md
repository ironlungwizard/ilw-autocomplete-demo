# autocomplete

## Цель

Разработка переиспользуемого компонента, выполняющего функцию поисковой строки с удобным автозаполнением и возможностью подключать различные источники данных.

## Функционал

1. При нажатии на поле поиска появляется список пунктов, состоящий из стандартных полей либо релевантных к введённому поисковому запросу.
2. При введении в поле поиска одной или нескольких букв, список предложенных вариантов включает в себя популярные запросы, содержащие введённый фрагмент. Eсли в первом предложенном варианте поисковый фрагмент находится не в начале запроса, он не предлагается к автозаполнению. Также среди найденных вариантов введённые фрагменты запроса выделяются, находись они в начале, середине или конце любого из слов.
3. Первый из предложенных вариантов предлагается для автозаполнения, отображаясь серым текстом как подложка под вводимый в поле текст. Автозаполнение происходит пословно при нажатии на TAB.
4. Если пользователь нажимает TAB для автозаполнения, или сам допечатывает слово, следующее за ним не предлагается к автозаполнению, пока пользователь не поставит пробел, разделяющий эти слова/фрагменты.
5. Компонент в обязателньом порядке принимает в свойство dataSource функцию, осуществляющую получение и передачу данных. На вход ей подаются введённые в поле поиска данные и таймштамп, позволяющий идентифицировать ответы на запросы, возвращать функция должна объект состоящий из переданного временного указателя (timeStamp) и данных (data).

## Взаимодействие

При использовании компонента есть возможность импортировать другой датасорс (возвращаемая функция должна принимать value - введённое в поле поиска значение и timeStamp - временной маркер, возвращаемый вместе с ответом для идентификации). Также при необходимости там указывается ссылка на источник данных и возможна конфигурация компонента передаваемыми пропсами.

Компонент на данный момент опционально принимает в себя следующие пропсы:

width - по дефолту выставлено 300
height - по дефолту выставлено 60
fullWidthBool
autoComplete
autocompleteSize
autoHighlight
autoSelect
blurOnSelect
classes
clearOnEscape
disableCloseOnSelect
disabled
disableListWrap
forcePopupIcon
freeSolo - по дефолту указано true
disablePortal - по дефолту указано true
handleHomeEndKeys - по дефолту указано true

Информацию о их значении можно найти в руководстве по оригинальному компоненту (https://mui.com/material-ui/api/autocomplete/).

debounceTime - по дефолту выставлено 150, отвечает за длину задержки ввода

## Результаты

В результате разработки был реализован переиспользуемый компонент поисковой строки с автозаполнением, дающий возможность подключать различные источники данных, использующий debounce для уменьшения количества запростов на сервер при быстрой печати и строгую идентификацию ответов на запросы, что позволяет отвечать только на ответ последнего запроса, что поможет в случае если ответы на запросы будут перемешаны.
Также было сделано два примера датасорса, один из которых запрашивает данные на каждое изменение введённых в компоненте данных (но с использованием дебаунса), а второй загружает данные при рендере компонента и отдает их при запросе с компонента. Оба датасорса производят сортировку и фильтрацию, приоритезируя опции с введённым фрагментом в начале строки.

## Особенности

1. Для удобства разработки отдельного копмонента было решено использовать storybook
2. В качестве сборщика демо был использован webpack
3. За основу компонента был взять автокомплит из Material UI
4. Сам компонент был выложен как npm пакет и скачивается в демо проект с него, в качестве сборщика пакета был использован rollup
5. Для реализации асинхронных запросов были использованы промисы
6. Напрямую расширить интерфейс оригинального компонента не удалось, из-за чего пришлось прокидывать пропсы, которые могут быть востребованы к изменению

## Стэк

Для разработки были использованы: библиотека React, препроцессор SCSS, язык TypeScript. Проект поднимался на nginx. SCSS компилировался с помощью Babel, а модули собирались с помощью Webpack. Продуктовая версия развернута в Docker с помощью nginx в режиме обратного прокси.

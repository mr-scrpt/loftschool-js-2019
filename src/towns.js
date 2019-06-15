/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */



/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise((resolve, reject)=>{
        let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
        let loaderList = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();

                return json.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                })
            } catch (e) {
                throw new Error(e.message);
            }
        };
        let loadList = loaderList();

        if (loadList) {
            resolve(loadList)
        } else {
            reject();
        }
    })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    let regexp = new RegExp(chunk, 'i');

    if (full.search(regexp) > -1) {
        return true;
    } else {
        return false;
    }
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

function renderList(list) {
    for (let item of list) {
        let fragment = document.createDocumentFragment();
        let span = document.createElement('span');

        span.innerText = item.name;
        fragment.appendChild(span);
        filterResult.appendChild(fragment);
    }
}

addEventListener('DOMContentLoaded', async (e)=>{
    try {
        let res = await loadTowns('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        renderList(res);
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
    } catch (e) {
        let button = document.createElement('button');

        button.classList.add('reload');
        button.innerText = 'Перезапросить';
        loadingBlock.innerHTML = '<strong>Не удалось загрузить города</strong>';
        loadingBlock.appendChild(button);
    }
});

document.body.addEventListener('click', e=>{
    if (e.target.classList.contains('reload')) {

    }
})

filterInput.addEventListener('keyup', async (e)=> {
    try {
        loadingBlock.style.display = 'block';
        let res = await loadTowns();
        filterResult.innerHTML = '';
        let filterRes = [];

        for (let item of res) {
            if (isMatching(item.name, e.target.value)) {
                filterRes.push(item)
            }
        }
        renderList(filterRes);
        loadingBlock.style.display = 'none';
    } catch (e) {
        throw new Error(e.message)
    }

});

export {
    loadTowns,
    isMatching
};

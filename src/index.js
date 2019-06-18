/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {

    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    // Вариант через then
    /* fetch(url)
        .then((response)=> {
            response.json()
                .then((json)=> {
                    resolve(json.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }

                        return 0;
                    }))
                })
        })
        .catch((e)=>{
            throw new Error(e.message)
        })
    */

    // Вариант через async\await
    return (async () => {
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

    })()

}

export {
    delayPromise,
    loadAndSortTowns
};

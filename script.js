// Функция для генерации случайного числа
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Меняем элементы местами
    }
    return array;
}

// Функция для создания случайных данных
function generateRandomData(rows) {
    const countries = ["США", "Россия", "Китай", "Индия", "Бразилия", "Германия", "Франция", "Япония", "Австралия", "Канада", "Италия", "Испания", "Аргентина", "Мексика", "Турция", "Южная Корея", "Египет", "Великобритания", "Швеция", "Норвегия", "Иран", "Саудовская Аравия", "Таиланд", "ЮАР (Южно-Африканская Республика)", "Чили", "Польша", "Греция"];
    const shuffledCountries = shuffleArray([...countries]); // Перемешиваем страны
    const uniqueCountries = shuffledCountries.slice(0, rows); // Берем нужное количество уникальных стран

    const data = [];
    for (let i = 0; i < rows; i++) {
        const country = uniqueCountries[i];
        const population = getRandomNumber(100000, 20000000); // Население от 100k до 20M
        data.push([country, population]);
    }
    return data;
}

// Функция для заполнения таблицы данными
function populateTable(table, data) {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = ''; // Очищаем таблицу

    data.forEach(rowData => {
        const row = document.createElement('tr');
        rowData.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

// Функция для сортировки таблицы
function sortTable(columnIndex, ascending) {
    const table = document.getElementById('data-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((rowA, rowB) => {
        const cellA = rowA.children[columnIndex].textContent;
        const cellB = rowB.children[columnIndex].textContent;

        // Преобразуем строки в числа для столбца "Население"
        if (columnIndex === 1) { // Индекс столбца "Население"
            return ascending
                ? parseFloat(cellA) - parseFloat(cellB)
                : parseFloat(cellB) - parseFloat(cellA);
        }

        return 0; // Для других столбцов сортировка не применяется
    });

    // Очищаем tbody и добавляем отсортированные строки
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

// Инициализация таблицы
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('data-table');

    // Генерируем случайные данные
    const rows = getRandomNumber(5, 8); // Случайное количество строк (не больше длины массива стран)
    const data = generateRandomData(rows);
    populateTable(table, data);

    // Добавляем обработчики событий для сортировки только столбца "Население"
    const populationHeader = table.querySelector('th:nth-child(2)');
    const sortUp = populationHeader.querySelector('.sort:nth-child(1)');
    const sortDown = populationHeader.querySelector('.sort:nth-child(2)');

    sortUp.addEventListener('click', () => sortTable(1, true)); // По возрастанию
    sortDown.addEventListener('click', () => sortTable(1, false)); // По убыванию
});
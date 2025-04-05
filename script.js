// Функция для генерации случайного числа
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Функция для создания случайных данных
function generateRandomData(rows, cols) {
    const countries = ["США", "Россия", "Китай", "Индия", "Бразилия", "Германия", "Франция", "Япония"];
    const shuffledCountries = shuffleArray([...countries]);
    const uniqueCountries = shuffledCountries.slice(0, rows);

    const data = [];
    for (let i = 0; i < rows; i++) {
        const rowData = [uniqueCountries[i]]; // Первая колонка - страна
        for (let j = 1; j < cols; j++) {
            rowData.push(getRandomNumber(1, 100)); // Генерация случайных чисел
        }
        data.push(rowData);
    }
    return data;
}

// Функция для заполнения таблицы данными
function populateTable(table, data, headers) {
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');

    // Очищаем заголовки и строки
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Добавляем заголовки
    headers.forEach((headerText, index) => {
        const th = document.createElement('th');
        th.textContent = headerText;

        if (index > 0) { // Добавляем значки сортировки только для числовых столбцов
            th.innerHTML += ' <span class="sort">&Lambda;</span><span class="sort">V</span>';
        }

        thead.appendChild(th);
    });

    // Добавляем строки
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

        // Преобразуем строки в числа для числовых столбцов
        if (columnIndex > 0) { // Индексы числовых столбцов
            const valueA = parseFloat(cellA);
            const valueB = parseFloat(cellB);
            return ascending ? valueA - valueB : valueB - valueA;
        }

        return ascending
            ? cellA.localeCompare(cellB) // Для текстовых столбцов
            : cellB.localeCompare(cellA);
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

// Инициализация таблицы
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('data-table');

    // Генерируем случайное количество строк и столбцов
    const rows = getRandomNumber(5, 8); // Случайное количество строк
    const cols = getRandomNumber(3, 5); // Случайное количество столбцов

    // Создаем заголовки
    const headers = ["Страна"];
    for (let i = 1; i < cols; i++) {
        headers.push(`Характеристика ${i}`);
    }

    // Генерируем данные
    const data = generateRandomData(rows, cols);
    populateTable(table, data, headers);

    // Добавляем обработчики событий для сортировки
    const headersRow = table.querySelector('thead tr');
    headersRow.querySelectorAll('th').forEach((header, index) => {
        if (index > 0) { // Пропускаем первый столбец ("Страна")
            const sortUp = header.querySelector('.sort:nth-child(1)');
            const sortDown = header.querySelector('.sort:nth-child(2)');

            sortUp.addEventListener('click', () => sortTable(index, true)); // По возрастанию
            sortDown.addEventListener('click', () => sortTable(index, false)); // По убыванию
        }
    });
});

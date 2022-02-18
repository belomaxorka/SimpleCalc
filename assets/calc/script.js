/**
 * script.js
 *
 * @author: corew
 * @package SimpleCalc
 */

/* Класс калькулятора */
class Calculator {

    /* Метод конструктора */
    constructor() {
        /* Основные функции */
        this.isEmpty = function isEmpty(value) { // Проверка на пустоту
            return (typeof value === 'undefined' || value == null || value.toString().trim().length == 0 || value.toString().trim() == '');
        }
        this.isNumber = function isNumber(n) { // Проверка на number
            if(Number.isFinite(n) || Number.isNaN(n)) {
                return Number(n) === n;
            } else {
                return false;
            }
        }
        this.isString = function isString(x) { // Проверка на string
            return Object.prototype.toString.call(x) === "[object String]";
        }
        this.CleanString = function CleanString(x) { // Очистка строки
            let cleaning = x;
            cleaning.split('').join(''); // Первый этап
            cleaning.replace(/[.*+?^${}()|[\]\\]/g, ''); // Второй этап
            cleaning.replace(/[&<"']/g, function (m) { // Третий этап
                switch (m) {
                    case '&':
                    case '<':
                    case '"':
                    default:
                        return '';
                }
            });
            cleaning.trim(); // Четвертый этап
            return cleaning; // Вывод конечной строки
        }
        this.NumberSanitize = function NumberSanitize(n) { // Преобразование числа в нормальный вид
            return n;
        }
        this.FixedNumber = function FixedNumber(number, fixed) { // Приводим число в нормальный вид
            if ((typeof number === 'number' || typeof number === 'string') && !isNaN(number - parseFloat(number))) {
                number = String(number);
                let split = number.split('.');
                if (split.length > 1) {
                    let left = split[0];
                    let right = split[1].substr(0, (!fixed ? 4 : fixed));
                    return Number(left + (fixed !== 0 ? '.' + right : ''));
                } else {
                    return Number(number);
                }
            }
        }

        /* Создаём пустой объект с типом number, которому в будущем присвоим значение состоящее из ответа */
        Number(this.result = null);
    }

    /* Основной метод */
    calculate(fnum, operation, lnum) {
        /* Инициализируем переменные + производим очистку входных данных + преобразуем их в string + приводим число в нормальный вид */
        let num1 = this.CleanString(this.NumberSanitize(String(fnum))); // Первое число
        let num2 = this.CleanString(this.NumberSanitize(String(lnum))); // Второе число
        let operator = this.CleanString(String(operation)); // Оператор

        /* Работа с ведёнными данными (первое и второе число) */
        /* Первое число */
        if (!this.isEmpty(num1)) { // Проверка на пустоту
            if (!this.isString(num1)) { // Проверка на string
                /* Вывод сообщения об ошибке */
                M.toast({text: 'Что-то пошло не так... (#01 | Not String)'});
                /* Останавливаем код + скрываем поле с ответом */
                $('#action_result').parent().slideUp();
                return false;
            } else {
                /* Преобразуем данные из string в number (чтобы произвести дальнейшие расчёты) */
                num1 = Number(num1);
            }
            if (!this.isNumber(num1)) { // Проверка на number
                /* Вывод сообщения об ошибке */
                M.toast({text: 'Что-то пошло не так... (#02 | Not Number)'});
                /* Останавливаем код + скрываем поле с ответом */
                $('#action_result').parent().slideUp();
                return false;
            }
        } else {
            /* Вывод сообщения об ошибке */
            M.toast({text: 'Введите первое число!'});
            /* Останавливаем код + скрываем поле с ответом */
            $('#action_result').parent().slideUp();
            return false;
        }
        /* Второе число */
        if (!this.isEmpty(num2)) { // Проверка на пустоту
            if (!this.isString(num2)) { // Проверка на string
                /* Вывод сообщения об ошибке */
                M.toast({text: 'Что-то пошло не так... (#01 | Not String)'});
                /* Останавливаем код + скрываем поле с ответом */
                $('#action_result').parent().slideUp();
                return false;
            } else {
                /* Преобразуем данные из string в number (чтобы произвести дальнейшие расчёты) */
                num2 = Number(num2);
            }
            if (!this.isNumber(num2)) { // Проверка на number
                /* Вывод сообщения об ошибке */
                M.toast({text: 'Что-то пошло не так... (#02 | Not Number)'});
                /* Останавливаем код + скрываем поле с ответом */
                $('#action_result').parent().slideUp();
                return false;
            }
        } else {
            /* Вывод сообщения об ошибке */
            M.toast({text: 'Введите второе число!'});
            /* Останавливаем код + скрываем поле с ответом */
            $('#action_result').parent().slideUp();
            return false;
        }

        /* Смотрим что было в переменной operator и производим расчёты в соответствии с кейсом */
        if (!this.isEmpty(operator)) { // Проверка на пустоту
            if (this.isString(operator)) { // Проверка на строку
                switch (operator) {
                    /* Сложение */
                    case 'plus_action':
                        this.result = num1 + num2; // Складываем первое и второе число
                        break;
                    /* Вычитание */
                    case 'minus_action':
                        this.result = num1 - num2; // Вычитаем из первого - второе число
                        break;
                    /* Деление */
                    case 'division_action':
                        this.result = num1 / num2; // Делим первое число на второе
                        break;
                    /* Умножение */
                    case 'multiplication_action':
                        this.result = num1 * num2; // Умножаем первое число на второе
                        break;
                    /* Если не выбран оператор (или/и если его нету в данной конструкции) */
                    default:
                    case 'default_action':
                        /* Вывод сообщения об ошибке */
                        M.toast({text: 'Выберите операцию!'});
                        /* Останавливаем код + скрываем поле с ответом */
                        $('#action_result').parent().slideUp();
                        return false;
                }
                /* Преобразуем конечный результат в string + очищаем + приводим в нормальный вид */
                this.result = this.CleanString(this.NumberSanitize(String(this.result)));
            } else {
                /* Вывод сообщения об ошибке */
                M.toast({text: 'Что-то пошло не так... (#01 | Not String)'});
                /* Останавливаем код + скрываем поле с ответом */
                $('#action_result').parent().slideUp();
                return false;
            }
        } else {
            /* Вывод сообщения об ошибке */
            M.toast({text: 'Что-то пошло не так... (#03 | Empty)'});
            /* Останавливаем код + скрываем поле с ответом */
            $('#action_result').parent().slideUp();
            return false;
        }

        /* Выводим результат */
        if (!this.isEmpty(this.result)) { // Проверка на пустоту
            if (this.isString(this.result)) { // Проверка на string
                /* Преобразуем конечный результат из string в number (чтобы вывести) */
                this.result = Number(this.result);
                if (this.isNumber(this.result)) { // Проверка на number
                    /* Показываем поле */
                    $('#action_result').parent().slideDown();
                    if ($('#action_result').parent().is(':visible')) {
                        /* Показываем ответ + приводим число в нормальный вид */
                        $('#action_result')
                            .focus()
                            .val(this.FixedNumber(this.result, Infinity));
                        /* Вывод сообщения об успехе операции + с конечным числом */
                        M.toast({text: 'Успешно! Результат:' + '&nbsp;' + this.FixedNumber(this.result, Infinity) + '.'});
                        /* Всё хорошо, останавливаем код */
                        return true;
                    } else {
                        /* Вывод сообщения об ошибке */
                        M.toast({text: 'Что-то пошло не так... (#04 | DOM Element Not Found)'});
                        /* Останавливаем код + скрываем поле с ответом */
                        $('#action_result').parent().slideUp();
                        return false;
                    }
                } else {
                    /* Вывод сообщения об ошибке */
                    M.toast({text: 'Что-то пошло не так... (#02 | Not Number)'});
                    /* Останавливаем код + скрываем поле с ответом */
                    $('#action_result').parent().slideUp();
                    return false;
                }
            } else {
                /* Вывод сообщения об ошибке */
                M.toast({text: 'Что-то пошло не так... (#01 | Not String)'});
                /* Останавливаем код + скрываем поле с ответом */
                $('#action_result').parent().slideUp();
                return false;
            }
        } else {
            /* Вывод сообщения об ошибке */
            M.toast({text: 'Что-то пошло не так... (#03 | Empty)'});
            /* Останавливаем код + скрываем поле с ответом */
            $('#action_result').parent().slideUp();
            return false;
        }
    }

    /* Метод для очистки формы от ведённых данных */
    clear() {
        /* Очищаем форму методом reset */
        $('form')[0].reset();
        /* Выводим сообщение об успехе */
        M.toast({text: 'Вы успешно очистили все поля!'});
        /* Всё хорошо, останавливаем код + скрываем поле с ответом */
        $('#action_result').parent().slideUp();
        return true;
    }

    /* Метод для копирования конечного ответа */
    copy() {
        /* Преобразуем конечный результат в string + очищаем + приводим в нормальный вид */
        this.result = this.CleanString(this.NumberSanitize(String(this.result)));
        /* Проверка */
        if (!this.isEmpty(this.result)) { // Проверка на пустоту
            if (!this.isString(this.result)) { // Проверка на string
                /* Вывод сообщения об ошибке */
                M.toast({text: 'Что-то пошло не так... (#01 | Not String)'});
                /* Останавливаем код */
                return false;
            } else {
                /* Преобразуем результат из string в number */
                this.result = Number(this.result);
            }
            if (this.isNumber(this.result)) { // Проверка на number
                /* Приводим результат в нормальный вид + копируем его в буфер обмена */
                navigator.clipboard.writeText(this.FixedNumber(this.result, Infinity))
                    .then(() => {
                        /* Выводим сообщение об успехе */
                        M.toast({text: 'Вы успешно скопировали результат!'});
                        /* Всё хорошо, останавливаем код */
                        return true;
                    })
                    .catch(() => {
                        /* Вывод сообщения об ошибке */
                        M.toast({text: 'Что-то пошло не так... (#05 | Copy Error)'});
                        /* Останавливаем код */
                        return false;
                    });
            } else {
                /* Вывод сообщения об ошибке */
                M.toast({text: 'Что-то пошло не так... (#02 | Not Number)'});
                /* Останавливаем код */
                return false;
            }
        } else {
            /* Вывод сообщения об ошибке */
            M.toast({text: 'Что-то пошло не так... (#03 | Empty)'});
            /* Останавливаем код */
            return false;
        }
    }
}

/* Инициализируем класс калькулятора */
let Calc = new Calculator();
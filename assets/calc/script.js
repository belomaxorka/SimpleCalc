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
        this.isEmpty = function isEmpty(value) {
            return (typeof value === 'undefined' || value == null || value === 0);
        }
        this.isNumber = function isNumber(n) {
            return Number(n) === n;
        }
        this.isString = function isString(x) {
            return Object.prototype.toString.call(x) === "[object String]";
        }
        this.FixedNumber = function FixedNumber(number, fixed) {
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

        /* Создаём пустой объект, которому в будущем присвоим значение из ответа */
        this.result = null;
    }

    /* Основная метод */
    calculate(fnum, operation, lnum) {
        /* Инициализируем переменные */
        let num1 = Number(fnum); // Храним и получаем первое число
        let num2 = Number(lnum); // Храним и получаем второе число
        let operator = String(operation.trim()); // Храним, получаем и проверяем значение оператора

        /* Работа с ведёнными данными (первое и второе число) */
        if (!this.isEmpty(num1)) {
            if (!this.isNumber(num1)) {
                /* Вывод сообщения */
                M.toast({html: 'Что-то пошло не так...'});
                /* Останавливаем код + скрываем поле с ответом */
                $('#action_result').parent().slideUp();
                return false;
            }
        } else {
            /* Вывод сообщения */
            M.toast({html: 'Введите первое число!'});
            /* Останавливаем код + скрываем поле с ответом */
            $('#action_result').parent().slideUp();
            return false;
        }
        if (!this.isEmpty(num2)) {
            if (!this.isNumber(num2)) {
                /* Вывод сообщения */
                M.toast({html: 'Что-то пошло не так...'});
                /* Останавливаем код + скрываем поле с ответом */
                $('#action_result').parent().slideUp();
                return false;
            }
        } else {
            /* Вывод сообщения */
            M.toast({html: 'Введите второе число!'});
            /* Останавливаем код + скрываем поле с ответом */
            $('#action_result').parent().slideUp();
            return false;
        }

        /* Смотрим что было в переменной operator и производим расчёты */
        if (this.isString(operator) && !this.isEmpty(operator)) {
            switch (operator) {
                /* Сложение */
                case 'plus_action':
                    this.result = num1 + num2;
                    break;
                /* Вычитание */
                case 'minus_action':
                    this.result = num1 - num2;
                    break;
                /* Деление */
                case 'division_action':
                    this.result = num1 / num2;
                    break;
                /* Умножение */
                case 'multiplication_action':
                    this.result = num1 * num2;
                    break;
                /* Если не выбран оператор (или/и если его нету в данной конструкции) */
                default:
                case 'default_action':
                    /* Выводим сообщениие + останавливаем код + скрываем поле с ответом */
                    M.toast({html: 'Выберите операцию!'});
                    $('#action_result').parent().slideUp();
                    break;
            }
        } else {
            /* Вывод сообщения */
            M.toast({html: 'Что-то пошло не так...'});
            /* Останавливаем код + скрываем поле с ответом */
            $('#action_result').parent().slideUp();
            return false;
        }

        /* Выводим результат */
        if (!this.isEmpty(this.result)) {
            /* Показываем поле с конечным ответом */
            if (this.isNumber(this.result)) {
                $('#action_result').parent().slideDown();
                if ($('#action_result').parent().is(':visible')) {
                    /* Показываем поле с ответом + приводим число в нормальный вид */
                    $('#action_result')
                        .focus()
                        .val(this.FixedNumber(this.result, Infinity));
                    /* Вывод сообщения об успехе операции + с конечным числом */
                    M.toast({html: 'Успешно! Результат:' + '&nbsp;' + this.FixedNumber(this.result, Infinity) + '.'});
                    /* Всё хорошо, останавливаем код */
                    return true;
                } else {
                    /* Вывод сообщения */
                    M.toast({html: 'Что-то пошло не так...'});
                    /* Останавливаем код + скрываем поле с ответом */
                    $('#action_result').parent().slideUp();
                    return false;
                }
            } else {
                /* Выводим сообщения с результатом который получили в качестве исключения */
                M.toast({html: this.result});
                /* Останавливаем код + скрываем поле с ответом */
                $('#action_result').parent().slideUp();
                return false;
            }
        }
    }

    /* Метод для очистки формы от ведённых значений */
    clear() {
        /* Очищаем форму методом reset */
        $('form')[0].reset();
        /* Выводим сообщения об успехе */
        M.toast({html: 'Вы успешно очистили все поля!'});
        /* Всё хорошо, останавливаем код + скрываем поле с ответом */
        $('#action_result').parent().slideUp();
        return true;
    }

    /* Метод для копирования значения из поля с ответом */
    copy() {
        /* Проверка */
        if (!this.isEmpty(this.result)) {
            /* Копируем результат */
            navigator.clipboard.writeText(this.FixedNumber(this.result, Infinity))
                .then(() => {
                    /* Выводим сообщения об успехе */
                    M.toast({html: 'Вы успешно скопировали результат!'});
                    /* Всё хорошо, останавливаем код */
                    return true;
                })
                .catch(() => {
                    /* Вывод сообщения */
                    M.toast({html: 'Что-то пошло не так...'});
                    /* Останавливаем код */
                    return false;
                });
        } else {
            /* Вывод сообщения */
            M.toast({html: 'Что-то пошло не так...'});
            /* Останавливаем код */
            return false;
        }
    }
}

/* Инициализируем класс */
let Calc = new Calculator();
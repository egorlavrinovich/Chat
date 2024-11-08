export const rules = {
    REQUIRED: {
        required: true,
        message: 'Поле является обязательным',
    },
    EMAIL: {
        type: 'email',
        message: 'Неверный email'
    },
    PASSWORD_MIN_LENGTH: {
        min: 6,
        message: 'Пароль не должен быть меньше ${min} символов'
    },
    CONFIRM_PASSWORD: {
        required: true,
        message: 'Подтвердите пароль'
    }
}
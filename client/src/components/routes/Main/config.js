import {rules} from "../../../constants/rules.js";

const {REQUIRED, EMAIL, CONFIRM_PASSWORD, PASSWORD_MIN_LENGTH} = rules

export const authFormConfig = ({handleSetTypeAuth}) => ({
    title: 'Вход',
    fields: [
        {
            name: 'email',
            rules: [REQUIRED, EMAIL],
            label: 'E-mail',
            type: 'text'
        },
        {
            name: 'password',
            rules: [REQUIRED],
            label: 'Пароль',
            type: 'password'
        }
    ],
    submitBtn: {
        children: 'Войти',
        type: 'primary',
        htmlType: 'submit',
        className: 'main-btn'
    },
    footerBtns: [{
        children: 'Регистрация',
        size: 'small',
        type: 'link',
        onClick: handleSetTypeAuth
    }, {
        children: 'Не помню пароль',
        size: 'small',
        type: 'link',
    }]
})

export const registrationFormConfig = ({handleSetTypeAuth}) => ({
    title: 'Регистрация',
    fields: [
        {
            name: 'name',
            rules: [REQUIRED],
            label: 'Имя',
            type: 'text'
        },
        {
            name: 'email',
            rules: [REQUIRED, EMAIL],
            label: 'E-mail',
            type: 'text'
        },
        {
            name: 'password',
            rules: [REQUIRED, PASSWORD_MIN_LENGTH],
            label: 'Пароль',
            type: 'password',
        },
        {
            name: 'repeatPassword',
            rules: [CONFIRM_PASSWORD,
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('Пароли не совпадают'));
                    },
                }),
            ],
            label: 'Подтвердите пароль',
            type: 'password',
            dependencies: ['password']
        }
    ],
    submitBtn: {
        children: 'Зарегестрироваться',
        type: 'primary',
        htmlType: 'submit',
        className: 'main-btn'
    },
    footerBtns: [{
        children: 'У меня уже есть аккаунт',
        size: 'small',
        type: 'link',
        onClick: handleSetTypeAuth
    }]
})

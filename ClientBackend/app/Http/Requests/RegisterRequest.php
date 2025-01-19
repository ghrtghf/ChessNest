<?php

namespace App\Http\Requests;

use App\Rules\ValidUsername;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nickname' => ['required', 'string', 'min:2', 'max:255', new ValidUsername],
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:3',
        ];
    }

    public function messages()
    {
        return [
            'nickname.required' => 'Поле "Имя" обязательно для заполнения.',
            'nickname.string' => 'Поле "Имя" должно быть строкой.',
            'nickname.min' => 'Поле "Имя" должно содержать не менее :min символов.',
            'nickname.max' => 'Поле "Имя" должно содержать не более :max символов.',

            'email.required' => 'Поле "E-mail" обязательно для заполнения.',
            'email.string' => 'Поле "E-mail" должно быть строкой.',
            'email.email' => 'Введите корректный адрес электронной почты.',
            'email.max' => 'Поле "E-mail" должно содержать не более :max символов.',
            'email.unique' => 'Данный E-mail уже зарегистрирован.',

            'password.required' => 'Поле "Пароль" обязательно для заполнения.',
            'password.string' => 'Поле "Пароль" должно быть строкой.',
            'password.min' => 'Поле "Пароль" должно содержать не менее :min символов.',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'имя пользователя',
            'email' => 'адрес электронной почты',
            'password' => 'пароль',
        ];
    }
}

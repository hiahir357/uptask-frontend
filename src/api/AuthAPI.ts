import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, UserSchema } from "../types";
import api from "@/lib/axios";



export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = "/auth/create-account"
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.error)
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = "/auth/confirm-account"
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = "/auth/request-code"
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = "/auth/login"
        const { data } = await api.post<string>(url, formData)
        localStorage.setItem("AUTH_UPTASK_API_TOKEN", data)
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestResetPasswordCode(formData: ForgotPasswordForm) {
    try {
        const url = "/auth/forgot-password"
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData: ConfirmToken) {
    console.log(formData)
    try {
        const url = "/auth/validate-token"
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePasswordWithToken({formData, token} : {formData: NewPasswordForm, token: ConfirmToken["token"]}) {
    console.log(formData)
    try {
        const url = `/auth/update-password/${token}`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api.get("/auth/user")
        const response = UserSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
import { isAxiosError } from "axios";
import { ChangePasswordForm, CheckCurrentUserPasswordForm, UserProfileForm } from "../types";
import api from "@/lib/axios";


export async function updateProfile(formData: UserProfileForm) {
    try {
        const { data } = await api.put<string>("/auth/profile", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateCurrentPassword(formData: ChangePasswordForm) {
    try {
        const { data } = await api.post<string>("/auth/update-password", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkCurrentUserPassword(formData: CheckCurrentUserPasswordForm) {
    try {
        const { data } = await api.post<string>("/auth/check-password", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
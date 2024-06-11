import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { TaskSchema, type Project, type Task, type TaskFormData } from "../types";


type TaskAPI = {
    projectId: Project["_id"]
    formData : TaskFormData
    taskId: Task["_id"]
    status: Task["status"]
}
export async function createTask({projectId, formData} : Pick<TaskAPI, "projectId" | "formData">) {
    try {
        const url = `projects/${projectId}/tasks`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }   
}

export async function getTaskById({taskId, projectId} : Pick<TaskAPI, "taskId" | "projectId">) {
    try {
       const url = `projects/${projectId}/tasks/${taskId}`
       const { data } = await api.get(url)
       const response = TaskSchema.safeParse(data)
       if (response.success) {
        return response.data
       }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({taskId, projectId, formData} : Pick<TaskAPI, "taskId" | "projectId" | "formData">) {
    try {
        const url = `projects/${projectId}/tasks/${taskId}`
        const {data} = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTask({taskId, projectId} : Pick<TaskAPI, "taskId" | "projectId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTaskStatus({taskId, projectId, status} : Pick<TaskAPI, "taskId" | "projectId" | "status">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`
        const { data } = await api.post<string>(url, {status})
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
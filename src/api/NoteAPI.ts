import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

type NoteAPI = {
    formData: NoteFormData
    projectId: Project["_id"]
    taskId: Task["_id"]
    noteId: Note["_id"]
}

export async function createTaskNote({formData, projectId, taskId} : Pick<NoteAPI, "formData" | "projectId" | "taskId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTaskNote({projectId, taskId, noteId} : Pick<NoteAPI, "projectId" | "taskId" | "noteId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
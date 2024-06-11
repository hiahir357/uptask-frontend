import { isAxiosError } from "axios";
import { Project, ProjectTeamSchema, TeamMember, TeamMemberForm, TeamMemberSchema } from "../types";
import api from "@/lib/axios";


export async function findUserByEmail({formData, projectId} : {formData: TeamMemberForm, projectId: Project["_id"]}) {
    try {
        const url = `/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData)
        const response = TeamMemberSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToProject({projectId, id} : {projectId: Project["_id"], id: TeamMember["_id"]}) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.post<string>(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAllMembers(projectId: Project["_id"]) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.get(url)
        const response = ProjectTeamSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTeamMemberById({projectId, id} : {projectId: Project["_id"], id: TeamMember["_id"]}) {
    try {
        const url = `/projects/${projectId}/team/${id}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
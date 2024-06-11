import { deleteTaskNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../Spinner"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note } : NoteDetailProps) {

    const {data, isLoading} = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id , [data])
    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get("viewTask")!
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteTaskNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ["taskDetails", taskId]})
        }
    })

    const handleDeleteNote = () => {
        const data = { noteId: note._id, taskId, projectId }
        mutate(data)
    }

    if(isLoading) return <Spinner />
    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>{note.content}</p> por: <span className="font-bold">{note.createdBy.name}</span>
                <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
            </div>

            {canDelete && (
                <button
                    onClick={handleDeleteNote}
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
                >Eliminar</button>
            )}
        </div>
    )
}

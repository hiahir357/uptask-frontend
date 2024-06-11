import { addUserToProject } from "@/api/TeamAPI"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember
    resetData: () => void
}

export default function SearchResult({user, resetData} : SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            resetData()
            queryClient.invalidateQueries({queryKey: ["teamMembers", projectId]})
        }
    })

    const handleClick = () => {
        const data = {
            id: user._id,
            projectId
        }
        mutate(data)
    }

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado:</p>
            <div className="flex justify-between items-center">
                <div>
                    <p>{user.name}</p>
                    <p className="text-gray-400 text-sm font-light">{user.email}</p>
                </div>
                <button
                    onClick={handleClick}
                    className="text-purple-600 hover:bg-purple-100 transition-colors px-10 py-3 font-bold cursor-pointer"
                >Agregar al Proyecto
                </button>
            </div>
        </>
    )
}

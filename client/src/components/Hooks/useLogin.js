import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/authcontext'

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    let {setAuthUser} = useAuthContext()

    let login = async ({ email, password }) => {
        try {
            setLoading(true)
            let response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password })
            })

            let data = await response.json();
            if(!response.ok){
                toast.error(data.msg)
            }
            else{
                toast.success(data.msg)
                localStorage.setItem("chat-user",JSON.stringify(data.data))
                setAuthUser(data)
            }
        } catch (error) {
            toast.error(error.msg)
        }finally{
            setLoading(false)
        }

    }
    return {loading,login}
}

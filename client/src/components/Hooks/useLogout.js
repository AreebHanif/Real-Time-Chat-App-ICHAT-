import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/authcontext'

const useLogout = () => {
    let { setAuthUser } = useAuthContext()
    const logout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            let data = await res.json();
            if (!res.ok) {
                return toast.error(data.msg)
            }
            else {
                toast.success(data.msg)
                localStorage.removeItem("chat-user")
                setAuthUser(null)
            }
        } catch (error) {
            toast.error(error.msg)
        }
    }
    return  logout
}

export default useLogout
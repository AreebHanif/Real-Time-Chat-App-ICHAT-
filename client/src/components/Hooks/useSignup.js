import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/authcontext'

export const useSignup = () => {
    // usestates
    const [loading, setLoading] = useState(false)

    // usecontext
    const { setAuthUser } = useAuthContext()

    let signup = async ({ name, email, password, cpassword, gender }) => {
        let success = handleInputsError(name, email, password, cpassword, gender)
        if (!success) return;
        setLoading(true)
        try {
            let response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, cpassword, gender })
            })
            let data = await response.json()
            if (!response.ok) {
                toast.error(data.msg)
            }
            else {
                toast.success(data.msg)
                // localstorage
                localStorage.setItem("chat-user", JSON.stringify(data.data))
                // context
                setAuthUser(data.data)
            }
        } catch (error) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    let handleInputsError = (name, email, password, cpassword, gender) => {
        if (!name || !email || !password || !cpassword || !gender) {
            toast.error("Fill all the fields")
            return false
        }

        if (password !== cpassword) {
            toast.error("Password do not match")
            return false
        }
        if (password.length < 6) {
            toast.error("Password Must be at least 6 characters")
            return false
        }

        return true
    }
    return { loading, signup }
}

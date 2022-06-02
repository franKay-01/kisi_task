import { TextField, Button, ShowToast } from "../../common/components"
import { FacebookRounded, GitHub, Instagram } from "@mui/icons-material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Kisi from "kisi-client"
import { useDispatch } from "react-redux";
import { setUsers } from "../../redux/actions/allActions";

const Login = () => {

    const [user, setUser] = useState({ email: '', password: '' })

    const router = useNavigate()
    const dispatch = useDispatch()

    const icons = [
        <GitHub className="social-icon" key='gt' />,
        <Instagram className="social-icon" key='ig' />,
        <FacebookRounded className="social-icon" key='fb' />
    ]

    const login = e => {
        e.preventDefault()
        const kisiClient = new Kisi()
        if (user.email.length < 1 || user.password.length < 1) {
            alert('Please enter emai/password')
            return
        }

        kisiClient.signIn({ domain: 'test-task', email: user.email, password: user.password }).then(() => {
            ShowToast('success', 'Logged In')
            dispatch(setUsers({"email": user.email, "password": user.password}))
            sessionStorage.setItem('qqrv', 'Log me in')
            router('/')
        })
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="shrink-0 md:border w-1/4 rounded-md p-8">
                <div className="flex flex-col">
                    <p className="font-semibold">Login to Continue</p>
                    <p className="text-xs">Join thousands of developers</p>
                </div>
                <form className="w-full space-y-4 py-6" onSubmit={login}>
                    <TextField label='Username' type='email' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                    <TextField label='Password' type='password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
                    <Button label='Login' type='submit' />
                </form>
                <p className="text-sm">Don't have an account yet? <span className="link">Sign Up</span></p>
                <div className="pt-5 flex items-center justify-center space-x-2">
                    {icons.map((icon, i) => icon)}
                </div>
            </div>
        </div>
    )
}

export default Login
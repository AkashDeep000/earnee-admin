import {
  useState
} from "react"
import pb from "@/pb"

export default function Login() {
  const [email,
    setEmail] = useState("")
  const [pass,
    setPass] = useState("")
  const [loginState,
    setLoginState] = useState("idle")

  const handleLogin = async () => {
    if (!email || !pass) {
      return
    }
    try {
      setLoginState("loading")
      const authData = await pb.admins.authViaEmail(email, pass);
      setLoginState("success")
      window.location.reload()
    } catch (e) {
      console.log(e)
      setLoginState("failed")
    }
  }
  return (
    <div className="bg-slate-100 grid place-items-center p-2 h-screen">
    <div className="bg-white px-4 py-8 shadow grid place-items-center gap-2">
  {loginState === "failed" && <p className="p-3 bg-red-100 text-red-500 w-full">
Failed to authenticate
    </p>
      }
    <p className="pl-2 text-gray-800 w-full">
Email
      </p>
     <input className="formInput" type="text" value={email} onChange={() => setEmail(event.target.value)} />
    <p className="pl-2 text-gray-800 w-full">
Password
    </p>
     <input className="formInput" type="text" value={pass} onChange={() => setPass(event.target.value)} />
      <button
      onClick={handleLogin}
      className="text-white bg-indigo-500 px-3 py-2 rounded">
   {loginState === "loading" ? "loging in...": "login"}
    </button>
  </div>
</div>

)
}
import pb from "@/pb"

export default function Header() {
  return (
    <div className="bg-white px-4 py-2 flex justify-between shadow">
    <p className="text-indigo-500 text-2xl">
Earnee
    </p>
    <button
    onClick={()=> {
      pb.authStore.clear()
      window.location.reload()
    }}
    className="text-white bg-indigo-500 px-3 py-2 rounded">
    {"Log Out"}
    </button>
    </div>

  )
}
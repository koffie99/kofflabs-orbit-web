import Image from "next/image"
import Login from "./components/Login"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-neutral-900 flex items-center justify-center" style={{backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(255,255,255,0.1) 0.5px, transparent 0)`, backgroundSize: "8px 8px", backgroundRepeat: "repeat"}}>
      <div>
        <Login />
      </div>
    </div>
  )
}

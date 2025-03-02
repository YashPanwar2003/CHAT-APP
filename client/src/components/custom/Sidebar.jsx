import { Menu,X } from "lucide-react"
import Profile from "./Profile"


export default function Sidebar() {
    return (
        <div className="drawer h-10 w-10 rounded-full p-2 flex justify-center items-center hover:bg-slate-600 transition-all duration-300">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            <label htmlFor="my-drawer" className="h-10 w-10 rounded-full p-2 cursor-pointer">
                <Menu />
            </label>

            <div className="drawer-side z-10 ">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu relative bg-transparent backdrop-blur-lg text-base-content min-h-full w-80 p-12">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay absolute top-3 left-3 bg-transparent cursor-pointer p-2.5 hover:bg-[rgba(255,255,255,0.2)] rounded-full transition-all duration-300 flex justify-center items-center"><X/></label>
                    <Profile />
                </ul>
            </div>
        </div>
    )
}
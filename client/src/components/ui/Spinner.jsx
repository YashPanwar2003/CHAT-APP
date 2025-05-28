import {Loader} from "lucide-react"


const Spinner = () => {
  return (
    <div className="rounded-full animate-spin h-fit w-fit  transition-all bg-transparent">
        <Loader className="text-white"/>
    </div>
  )
}

export default Spinner
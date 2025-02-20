export default function ChatSkeletons(){
    const arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    return (
        <div className="flex flex-col gap-1 h-full overflow-y-auto ">
            {arr.map(val=>{
                if(val%2==0) return(
                    <div className="chat-end">
                      <div className="skeleton w-1/4 h-6"></div>
                    </div>
                )
                else return (
                    <div className="chat-start">
                        <div className="skeleton w-1/4 h-6"></div>
                    </div>
                )
            }

            )}
        </div>
    )
}
export default function ChatSkeletons(){
    const arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    return (
        // <div className="flex flex-col gap-1 h-full overflow-y-auto ">
        //     {arr.map(val=>{
        //         if(val%2==0) return(
        //             <div key={val} className="chat-end">
        //               <div className="skeleton w-1/4 h-6"></div>
        //             </div>
        //         )
        //         else return (
        //             <div key={val} className="chat-start">
        //                 <div className="skeleton w-1/4 h-6"></div>
        //             </div>
        //         )
        //     }

        //     )}
        // </div>
        <div className="flex flex-col space-y-2 px-2 h-full ">
        {/* Incoming Message (User) */}
        <div className="chat chat-start">
          <div className="chat-bubble w-32 h-6 skeleton"></div>
        </div>
  
        {/* Outgoing Message (You) */}
        <div className="chat chat-end">
          <div className="chat-bubble w-40 h-6  skeleton"></div>
        </div>
  
        {/* Incoming Message (User) */}
        <div className="chat chat-start">
          <div className="chat-bubble w-46 h-6  skeleton"></div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble w-50 h-6  skeleton"></div>
        </div>
  
        {/* Outgoing Message (You) */}
        <div className="chat chat-end">
          <div className="chat-bubble w-36 h-6  skeleton"></div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble w-30 h-6  skeleton"></div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble w-32 h-6 skeleton"></div>
        </div>
        <div className="chat chat-start">
          <div className="chat-bubble w-40 h-6 skeleton"></div>
        </div>
      </div>
    )
}
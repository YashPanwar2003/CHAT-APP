

const Skeleton = () => {
    const arr=[1,2,3,4,8,9,10]
    return (
       <>
       {arr.map(val=>(<div key={val} className="flex w-full h-[20%] gap-3 p-3 justify-start items-center">
                <div className="h-11 w-11 bg-gray-950 skeleton rounded-full"></div>
                 <div className="h-4 w-3/4 bg-gray-950 skeleton sm:hidden md:block"></div>
            </div>))}
       </>
    )
}

export default Skeleton
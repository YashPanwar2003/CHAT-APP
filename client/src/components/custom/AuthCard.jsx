export default function Card({ AuthForm }) {
  return (
    <main className="h-screen w-screen flex justify-center bg-gradient-to-b from-indigo-400 to-indigo-800 items-center">
      <div className="h-3/4 w-3/5 bg-[#181A1C] rounded-2xl flex flex-col justify-center lg:grid lg:grid-cols-2 shadow-[4px_4px_25px_rgba(0,0,0,0.5)]">

        <div className="hidden lg:flex justify-center overflow-hidden items-center">
          <img className="object-cover rounded-2xl" src="/assets/logo.png" alt="Large Logo" />
        </div>

        <div className="flex justify-center items-start flex-col gap-4">

          <div className="flex overflow-hidden w-full justify-center items-center lg:hidden">
            <img style={{ scale: 1.5 }} src="/assets/logo.png" className="h-50" alt="Small Logo" />
          </div>
          <AuthForm />
        </div>
      </div>
    </main>
  )
}
const home = () => {
return (
    <div className="text-center ">
    <h1 className="h-5 font-semibold text-slate-900">HOME.LLC</h1>     
    <div className="space-x-4 mb-6 text-sm font-medium p-8">
      <div className="space-x-4">
            <a href="/users" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Find homes by user</a>
            <a href="/homes" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Find users by home</a>
      </div>
      </div>
    
    </div>
)
}
export default home;
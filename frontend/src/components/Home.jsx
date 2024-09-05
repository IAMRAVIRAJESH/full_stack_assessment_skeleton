const home = () => {
return (
    <div className="text-center ">
    <h1 class="h-5 font-semibold text-slate-900">HOME.LLC</h1>     
    <div class="space-x-4 mb-6 text-sm font-medium p-8">
      <div class="space-x-4">
        <button class="h-10 px-6 font-semibold rounded-md bg-black text-white">
            <a href="/users">Find homes by user</a>
        </button>
        <button class="h-10 px-6 font-semibold rounded-md bg-black text-white" type="button">
            <a href="/homes">Find users by home</a>
        </button>
      </div>
      </div>
    
    </div>
)
}
export default home;
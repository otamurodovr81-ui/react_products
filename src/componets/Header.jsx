
function Header({ search, setSearch}) {
    
    return <>
    
        <aside className="w-full h-[96px] bg-[#0008] flex items-center px-20">
            
            <input type="text" placeholder="Maxsulotlar..."
                className="bg-white w-[320px] px-5 py-2 rounded outline-none"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

     </aside>
        
    </>
}

export default Header;
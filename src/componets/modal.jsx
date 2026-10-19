import { useState } from "react";

function Modal({product, onClose, onSave }) {

    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price);

    
    return <div className="absolute top-0 left-0 w-full h-screen bg-[#0009] flex justify-center items-center " onClick={onClose} >
        <div className="w-[360px] h-[340px] bg-white rounded-[10px] px-10 py-5 flex flex-col" onClick={(e) => e.stopPropagation()} >
            
            <div className="flex justify-between">
                <h1 className="">Edid Product</h1>
                <button onClick={onClose} className="cursor-pointer ">x</button>
            </div>

              <div className="mt-8">
                <label>Maxsulot nomi</label>
                <input type="text" placeholder="text"
                    className="border w-full px-5 py-1 rounded outline-none mt-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label>Maxsulot narxi</label>
                <input type="number" placeholder="text"
                    className="border w-full px-5 py-1 rounded outline-none mt-2"
                    value={price}
                    onChange={ (e) => setPrice(e.target.value) }
                />
             </div>
            
 
            <div className="flex justify-between mt-15">
                <button onClick={onClose} className="cursor-pointer px-4 py-2 border rounded">Cancel</button>
                <button onClick={()=>onSave( product.id, title, price)} className="cursor-pointer px-5 py-2 rounded bg-[#000] text-white">Save</button>
            </div>

        </div>
    </div>
}

export default Modal;
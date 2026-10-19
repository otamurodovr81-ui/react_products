
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./componets/Header";
import { createPortal } from "react-dom";
import Modal from "./componets/modal";

function App() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [debounce, setDebounce] = useState("");


  useEffect(() => {
   
    async function getProducts() {
      try {

        const res = await axios.get("https://dummyjson.com/products?limit=0")
        setProducts(res.data.products);
      
      } catch (error) {
        console.log("Xatoli",error);
        
      };
    };
    getProducts();
    
  }, []);

  // loading 
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setDebounce(search);
      setLoading(false);
    }, 1500);


  return () => clearTimeout(timer);

  },[search])


  // delite
  async function handleDelete(id) {

    try {
      const res = await axios.delete(`https://dummyjson.com/products/${id}`)
      setProducts(
        products.filter((item) => {
          return item.id !== id
        })
      );
    } catch (error) {
      console.log("Ochirishda xatolik:", error);
    }
  };


  // put
  async function handlePut(id, title, price) {
  try {
    await axios.put(
      `https://dummyjson.com/products/${id}`,
      {
        title: title,
        price: Number(price),
      }
    );

    setProducts((oldProducts) =>
      oldProducts.map((item) =>
        item.id === id
          ? { ...item, title: title, price: Number(price) }
          : item
      )
    );

    setIsModalOpen(false);
    
  } catch (error) {
    console.log("Tahrirlashda xatolik:", error);
  }
  }
  
  // filter product
  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(debounce.trim().toLowerCase());
  });


  return <div className="flex h-screen flex-col">

    <Header search={search} setSearch={ setSearch } />
  
    <main className="flex-1 w-full h-screen overflow-y-auto bg-[#0026]" >

      <div className="max-w-[980px] mx-auto gap-[20px] flex flex-wrap pt-[44px]"> 

        {loading ? (
          <p className="w-full text-center text-xl">
            Loading ...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="w-full text-center text-xl ">
             Mahsulot topilmadi!
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-[230px] h-[335px] border rounded px-5 py-3 bg-white flex flex-col justify-between"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-[186px]"
              />

              <div>
                <h1>{product.title}</h1>
                <p>Price: {product.price}$</p>
                <p className="text-yellow-600">⭐ {product.rating}</p>
              </div>

              <div className="flex gap-[10px] justify-end">
                <button
                  onClick={() => {setSelect(product); setIsModalOpen(true) }} >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>

                <button onClick={() => handleDelete(product.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
        
      </div>
      
    </main>

    {isModalOpen && createPortal(<Modal onClose={() => setIsModalOpen(false)} product={select}  onSave={(id, title, price) => handlePut(id, title, price)}/>,document.getElementById("mood"))}

  </div>
}


export default App;
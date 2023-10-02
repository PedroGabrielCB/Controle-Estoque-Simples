import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineInbox } from "react-icons/ai";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import axios from "axios"; // Importe o Axios
import { Routes, Route,useNavigate,useParams } from "react-router-dom"

function App() {
  const [product, setproduct] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const API_BASE_URL = "https://6510c7e13ce5d181df5d7e19.mockapi.io"; // Substitua pela URL da sua API
  const product_API_URL = `${API_BASE_URL}/product`;

  useEffect(() => {
    // Busque todas as tarefas ao carregar o componente
    axios
      .get(product_API_URL)
      .then((response) => setproduct(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addProduct = (newProduct) => {
    navigate(`/`)
    if (editingProduct !== null) {
      // Se estamos editando, atualize a tarefa existente
      const ProductToEdit = product[editingProduct];
      const updatedProduct = { ...ProductToEdit, ...newProduct };
      const ProductUrl = `${product_API_URL}/${ProductToEdit.id}`;

      axios
        .put(ProductUrl, updatedProduct)
        .then((response) => {
          const updatedproduct = [...product];
          updatedproduct[editingProduct] = response.data;
          setproduct(updatedproduct);
          setEditingProduct(null); // Limpe o estado de edição
        })
        .catch((error) => console.error(error));
    } else {
      // Caso contrário, adicione uma nova tarefa
      axios
        .post(product_API_URL, newProduct)
        .then((response) => {
          setproduct([...product, response.data]);
        })
        .catch((error) => console.error(error));
    }
  };

  const removeProduct = (index) => {
    const ProductToRemove = product[index];
    const ProductUrl = `${product_API_URL}/${ProductToRemove.id}`;

    axios
      .delete(ProductUrl)
      .then(() => {
        const updatedproduct = [...product];
        updatedproduct.splice(index, 1);
        setproduct(updatedproduct);
        if (editingProduct === index) {
          setEditingProduct(null); // Limpe o estado de edição se a tarefa removida estava sendo editada
        }
      })
      .catch((error) => console.error(error));
  };
  const navigate = useNavigate();
  const updateProduct = (index) => {
    setEditingProduct(index);
    navigate(`/editarProduto/${index}`)
  };
 
  return (
    <div className="app">
        <Routes>
          <Route path="/" element={
               <ProductList
                 product={product}
                 removeProduct={removeProduct}
                 updateProduct={updateProduct}
               />
           }/>
          <Route path="/adicionarProduto" element={
                <ProductForm
                addProduct={addProduct}
                editingProduct={editingProduct}
                Products={product}
            />
          }/>
          <Route path="/editarProduto/:id" element={
              <ProductForm
                addProduct={addProduct}
                editingProduct={editingProduct}
                Products={product}
              />
          }/>
      </Routes>
    </div>
  );
}

export default App;

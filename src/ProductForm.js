import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import { RiAddLine, RiEdit2Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
function ProductForm({ addProduct, editingProduct, Products }) {
  const [ProductName, setProductName] = useState("");
  const [quantity, setquantity] = useState();
  let { id } = useParams();

  useEffect(() => {
    if (id !== null && id !== undefined && Products && Products.length > id) {
      // Se estamos editando, preencha os valores da tarefa
      const ProductToEdit = Products[id];
      setProductName(ProductToEdit.name);
      setquantity(ProductToEdit.quantity || "");
    } else {
      // Se não estamos editando ou a tarefa não existe, limpe o formulário
      setProductName("");
      setquantity("");
    }
  }, [id, Products]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handlequantityChange = (e) => {
    setquantity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ProductName.trim() === "") return;

    addProduct({ name: ProductName, quantity });
    setProductName("");
    setquantity("");
  };

  return (
    <div className="Product-form-Container">
      <form className="Product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Insira o nome do produto"
          value={ProductName}
          onChange={handleProductNameChange}
        />
        <input
          type="text"
          placeholder="Insira a quantidade de produtos"
          value={quantity}
          onChange={handlequantityChange}
        />
        <button type="submit">
          {editingProduct !== null ? (
            <>
              <RiEdit2Line /> Atualizar Produto
            </>
          ) : (
            <>
              <RiAddLine /> Adicionar Produto
            </>
          )}{" "}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;

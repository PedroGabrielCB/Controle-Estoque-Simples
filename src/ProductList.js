import React from "react";
import "./ProductList.css";
import {
  AiTwotoneCalendar,
  AiOutlineFileText,
  AiOutlineNumber,
  AiFillEdit
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AiOutlineInbox } from "react-icons/ai";
import { RiAddLine } from "react-icons/ri";
function ProductList({ product, removeProduct, updateProduct }) {
  const convertDate = (epoc) => {
    const data = new Date(epoc * 1000);
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Mês começa em 0 (janeiro) e vai até 11 (dezembro)
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  };
  const navigate = useNavigate();
  return (
    <>
      <h1 className="app-title">
        <AiOutlineInbox className="app-icon" /> Controle de Estoque
      </h1>
      <button
        className="buttonadd"
        type="submit"
        onClick={() => navigate("/adicionarProduto")}
      >
        <RiAddLine /> Adicionar Produto
      </button>
      <table className="Product-table">
        <thead>
          <tr>
            <th className="Product-header">
              <AiOutlineFileText className="header-icon" /> Produto
            </th>
            <th>
              <AiOutlineNumber className="header-icon" /> Quantidade
            </th>
            <th>
              <AiTwotoneCalendar className="header-icon" /> Data de Criação
            </th>
            <th>
              <AiFillEdit className="header-icon" /> Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {product &&
            product.map((Product, index) => (
              <tr key={index}>
                <td className={`Product-cell`}>{Product.name}</td>
                <td>{Product.quantity}</td>
                <td className={`Product-cell`}>
                  {convertDate(Product.InsertIn)}
                </td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => removeProduct(index)}
                  >
                    Remover
                  </button>
                  <button
                    className="update-button"
                    onClick={() => updateProduct(index)}
                  >
                    Atualizar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default ProductList;

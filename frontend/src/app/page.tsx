"use client";
import { IconTrashXFilled } from "@tabler/icons-react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type Fruit = {
  id: number;
  icon: string;
  name: string;
  vitamin: string;
  cft: boolean;
  description: string;
};

const Fruits = () => {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/fruits")
      .then((res) => res.json())
      .then((data) => setFruits(data));
  }, []);

  const columns = ["Ícone", "Nome", "Vitamina", "CFT"];
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/fruit-page/${id}`);
  };

  const handleAddFruit = () => {
    router.push("/addFruit");
  };

  const handleDeleteFruit = (id: number) =>{
    const warning = window.confirm("Quer mesmo eliminar esta fruta?")
    if(warning == true){
      fetch(`http://localhost:8080/fruits/${id}`, { 
      method: "DELETE",
    })
      .then(() => console.log("Fruta eliminada com sucesso!"))
      .then(() => window.location.reload()) // Reload to the fruits page after submission
      .catch((error) => console.error(error));
    }
  }

  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h1>Tudo o que precisa saber sobre estas frutas!</h1>
            <h2>Clica numa fruta para saber as suas características</h2>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {columns.map((column, i) => (
                    <th className={styles.th} key={i}  >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fruits.map((fruit: Fruit) => (
                  <tr
                    key={fruit.id}
                    onClick={() => handleClick(fruit.id)}
                    className={styles.tr}
                  >
                    <td className={styles.td}>{fruit.icon}</td>
                    <td className={styles.td}>{fruit.name}</td>
                    <td className={styles.td}>{fruit.vitamin}</td>
                    <td className={styles.td}>{fruit.cft ? "Sim" : "Não"}</td>
                    <td onClick={e => { e.stopPropagation(); handleDeleteFruit(fruit.id); }}><IconTrashXFilled/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.newFruit}>
            A sua fruta favorita não está aqui? Adicione-a!
            <button
              className={styles.adicionarFrutabtn}
              onClick={handleAddFruit}
            >
              Adicionar Fruta
            </button>
          </p>
        </div>
      </div>
  );
};

export default Fruits;

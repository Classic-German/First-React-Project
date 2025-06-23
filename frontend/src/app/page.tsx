"use client";
import { IconTrashXFilled } from "@tabler/icons-react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import useSWR from "swr";

type Fruit = {
  id: number;
  icon: string;
  name: string;
  vitamin: string;
  cft: boolean;
  description: string;
};

const Fruits = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("http://localhost:8080/fruits", fetcher, {revalidateOnFocus: true});

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
          {!data ? <div className={styles.loader}></div> : 
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
              {data.map((fruit: Fruit) => (
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
          </table>}
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

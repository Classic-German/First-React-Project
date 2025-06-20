"use client";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";

const AddFruit = () => {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [vitamin, setVitamin] = useState("");
  const[cft, setCft] = useState("");
  const [description, setDescription] = useState("")

  useEffect(() => {console.log(icon);}, [icon]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    
    const formData  = {
        icon: icon,
        name: name,
        vitamin: vitamin,
        cft: cft === "true" ? true : false,
        description: description
  };

    console.log(formData);
    
    fetch('http://localhost:8080/fruits', { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)})
      .then(() => console.log("Fruta adicionada com sucesso!"))
      .then(() => window.location.href = "http://localhost:3000/") // Redirect to the fruits page after submission
      .catch((error) => console.error(error));

      e.currentTarget.reset(); // Reset the form after submission
  }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Adicionar Fruta</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} method="POST">
          <div className={styles.campo}>
            <input type="text" name="icon" required
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
            <label htmlFor="icon">Ícone</label>
          </div>

          <div className={styles.campo}>
            <input type="text" name="name" required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Nome</label>
          </div>

          <div className={styles.campo}>
            <input type="text" name="vitamin" required
              value={vitamin}
              onChange={(e) => setVitamin(e.target.value)}
            />
            <label htmlFor="vitamin">Vitamina</label>
          </div>

          <div className={styles.campo}>
            <input name="description" required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="description">Descrição</label>
          </div>

          <div className={styles.checkbox}>
            <label htmlFor="cft">Veio de uma árvore?</label>
            <input type="checkbox" name="cft"
              value={cft} 
              onChange={(e) => setCft(e.target.checked ? "true" : "false")}
            />
          </div>

            <button type="submit" className={styles.primarybutton}>Guardar Fruta</button>
        </form>
      </div>
    </div>
  );
};

export default AddFruit;

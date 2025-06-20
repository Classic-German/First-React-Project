'use client'
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import React, {useState, useEffect} from 'react';

type Fruit = {
    id: number;
    icon: string;
    name: string;
    vitamin: string;
    cft: boolean;
    description: string;
}

    const Fruits = () => {
        const [fruit, setFruit] = useState<Fruit>()
        const params = useParams();
        const id = params['fruit-id']

        useEffect(() => {
            fetch(`http://localhost:8080/fruits/${id}`)
            .then(res => res.json())
            .then(data => setFruit(data))
        }, [id])

    if (!fruit) return null;

    return (
        <div className={styles.container}>
            
            <div className={styles.content}>
                <div >
                    <h1>Descobre mais sobre esta fruta: {fruit.name}{fruit.icon}</h1>
                </div>

                <div className={styles.text}>{fruit.description}</div> <br/><br/>
                <div className={styles.text}>
                <p className={styles.text}>Veio de uma árvore: {fruit.cft ? 'Sim' : 'Não'}</p></div>
            </div>
        </div>
    );
}

export default Fruits;
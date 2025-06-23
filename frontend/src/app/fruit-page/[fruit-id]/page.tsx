"use client";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import useSWR from "swr";

const Fruits = () => {
	const params = useParams();
	const id = params["fruit-id"];

	const fetcher = (url) => fetch(url).then((res) => res.json());
	const { data } = useSWR(`http://localhost:8080/fruits/${id}`, fetcher, {revalidateOnFocus: true});
	
  return (
		<div className={styles.container}>
			{!data ? <div>Loading....</div> :
			<div className={styles.content}>
				<h1> Descobre mais sobre esta fruta: {data.name}{data.icon} </h1>

				<div className={styles.text}>{data.description}</div>
				<br /><br />

				<div className={styles.text}>
					<p className={styles.text}> Veio de uma árvore: {data.cft ? "Sim" : "Não"} </p>
        </div>
			</div>}
		</div>
	);
};

export default Fruits;
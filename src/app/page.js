import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hello world!!</h1>
        <h2>This is my first Next JS project!</h2>
      </main>
    </div>
  );
}

import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import axios from "axios";

function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <h2>This is test component</h2>
        <Link href="/about">
          <a>About Us</a>
        </Link>
        <Link href="/main">
          <a>Main</a>
        </Link>
        <Link href="/browse?pack=true">
          <a>Browse</a>
        </Link>
        <ul>
          <div className={styles.wrapper}>
            {data.map(item => (
              <div className={styles.card_custom}>
                <img src={item.avatar} />
                <p>{item.first_name}</p>
                <p>{item.last_name}</p>
                <p>{item.email}</p>
              </div>
            ))}
          </div>
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get("https://reqres.in/api/users");

  return {
    props: {
      data: res.data.data
    }
  };
}

export default Home;

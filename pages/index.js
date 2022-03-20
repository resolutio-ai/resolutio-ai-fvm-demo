import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import AppHeader from "../components/AppHeader"

const Home = () => {
  return (
    <div >
      <Head>
        <title>Resolutio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppHeader/>
      <Link href="/about">
        <a>About Page</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </div>
  );
};

export default Home;

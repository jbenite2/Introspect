import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

export default function Home() {
    const [data, setData] = useState([]);
    const url = "api/get-pokemon";

    const getAllData = () =>
        axios
            .get(`${url}`)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));

    useEffect(() => {
        getAllData();
    }, []);

    console.log(data);

    return (
        <div className={styles.container}>
            <Head>
                <title>Introspect</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className={styles.title}>Introspect</h1>

                <div className="index__signin">
                    <Login />
                    <Signup />
                </div>
            </main>

            <style jsx>{`
                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                footer img {
                    margin-left: 0.5rem;
                }
                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
                }
                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                        monospace;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}

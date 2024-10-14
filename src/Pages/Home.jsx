import React, {useState} from "react";
import Header from "../Components/Header";

export default function Home() {
    const [count, setCount] = useState(0);
    return (
        <>
            <Header/>
            <h1>Welcome To DedeStore</h1>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click Me</button>
            <button onClick={() => setCount(count - 1)}>Click Me -</button>
        </>
    )
}
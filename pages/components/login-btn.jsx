import React from "react";
import {useSession, signIn} from "next-auth/react";

export default function LoginBtn() {
    const {data: session} = useSession();
    if (session) {
        return;
    }
    return(
        <button className="mb-4 btn-primary" type="submit" onClick={() => signIn()}>Enter</button>
    )
}
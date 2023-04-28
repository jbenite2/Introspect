import React, { useEffect } from "react";
import Router from "next/router";

const UnauthorizedPage = () => {
    useEffect(() => {
        const router = Router;
        const timer = setTimeout(() => {
            router.push("/");
        }, 3000);
        return () => clearTimeout(timer); // Clear the timer on unmount
    }, []);

    return (
        <div>
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to access this page.</p>
            <p>You will be redirected to the homepage in 3 seconds...</p>
        </div>
    );
};

export default UnauthorizedPage;
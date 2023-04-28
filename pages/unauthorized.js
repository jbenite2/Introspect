import React, { useEffect, useState } from "react";
import Router from "next/router";

const UnauthorizedPage = () => {
    const [countdown, setCountdown] = useState(3);
    const router = Router;

    if (countdown == 0) {
        router.push("/");
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 3000);
        const interval = setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        }; // Clear the timer on unmount
    }, [countdown]);

    return (
        <div className="bg-gradient-to-tr from-purple-600 to-blue-900 min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-black text-3xl font-bold mb-4">
                    Unauthorized Access
                </h1>
                <p className="text-black text-lg mb-4">
                    You do not have permission to access this page. You will be
                    redirected to the homepage in{" "}
                    <span className="font-bold">{countdown}</span> seconds...
                </p>
            </div>
        </div>
    );
};

export default UnauthorizedPage;

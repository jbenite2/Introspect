import React from "react";
import { BounceLoader } from "react-spinners";

const Spinner = () => {
    return (
        <div
            className="bg-gradient-to-tr from-purple-600 to-blue-900 min-h-screen flex flex-col justify-center items-center"
            style={{ color: "#fff" }}
        >
            <div>
                <BounceLoader size={170} color="#fff" />
            </div>
            <div className="text-xl font-bold mt-4">Loading...</div>
        </div>
    );
};

export default Spinner;

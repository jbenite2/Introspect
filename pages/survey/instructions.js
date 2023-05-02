import React from "react";
import Navbar from "../components/navbar/navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import UnauthorizedPage from "../unauthorized";
import Spinner from "../components/spinner/spinner";

function SurveyLandingPage() {
    const { data: session, status } = useSession();
    if (status == "loading") {
        return <Spinner />;
    }
    if (!session || status == "unauthenticated") {
        return <UnauthorizedPage />;
    }

    const Router = useRouter();

    return (
        <div className="bg-gradient-to-tr from-purple-600 to-blue-900 min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-full">
                <div className="w-full max-w-[300px] mt-[-40px]">
                    <Image
                        src="/Heart-and-Mind.png"
                        alt="Survey"
                        width={300}
                        height={200}
                        layout="responsive"
                    />
                </div>
                <h1 className="text-white text-4xl font-bold my-4 lg:my-8 lg:px-4 text-center">
                    Welcome to the Survey
                </h1>
                <p className="text-white text-lg px-10 mb-8 lg:mb-8 lg:px-4">
                    In this survey, you will encounter several scenarios, and
                    your objective is to carefully select your course of action
                    in each situation.
                </p>
                <p className="text-white text-lg px-10 mb-8 lg:mb-8 lg:px-4">
                    We recommend answering within 45 seconds, but you will not be penalized if you go over.
                </p>
                <p className="text-white text-lg px-10 mb-8 lg:mb-8 lg:px-4">
                    Some answers may sound similar, so choose the one that sounds the best to you.
                </p>

                <button
                    onClick={() => Router.push("/survey/test")}
                    className="bg-white hover:bg-gray-100 text-purple-500 font-semibold py-2 px-4 border border-purple-500 rounded shadow mb-8"
                >
                    Start Survey
                </button>
            </div>
            <style jsx>{`
                .max-w-500 {
                    max-width: 500px;
                }
            `}</style>
        </div>
    );
}

export default SurveyLandingPage;

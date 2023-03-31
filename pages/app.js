import React, { useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.status == 200) {
                //create a session and route user to dashboard or whatever
                setEmail("");
                setPassword("");
                alert("Login successful");
                router.push("/dashboard");
            } else {
                setEmail("");
                setPassword("");
                console.log("Invalid credentials");
                alert("Invalid credentials, try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="h-screen">
            <div className="h-screen flex">
                <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden">
                    <div>
                        <h1 className="text-white font-bold text-6xl font-sans">
                            Introspect
                        </h1>
                        <h2 className="text-white text-4 font-sans">
                            A Tech Ethics Project
                        </h2>
                    </div>
                </div>

                <div className="flex w-1/2 justify-center items-center">
                    <div className="w-full max-w-md space-y-8 p-10 pt-20 pb-20">
                        <div>
                            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                                Log into your account
                            </h2>
                        </div>
                        <form
                            className="mt-8 space-y-6"
                            action="#"
                            method="POST"
                            onSubmit={handleSubmit}
                        >
                            <input name="csrfToken" type="hidden" hidden />

                            <div className="rounded-md shadow-sm">
                                <div className="mb-4">
                                    <label
                                        htmlFor="email-address"
                                        className="sr-only"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full pl-2 rounded-t-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full pl-2 rounded-b-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="">
                                <button
                                    type="submit"
                                    className="mb-4 btn-primary"
                                >
                                    Log in
                                </button>

                                <div className="flex justify-center items-center">
                                    <a
                                        href="./signup"
                                        className="text-sm text-gray-600 hover:text-gray-500"
                                    >
                                        Or click here to sign up
                                    </a>
                                </div>
                            </div>
                        </form>

                        {/* <section className="mt-8 text-center">
                            <div className="flex flex-col mb-3">
                                <hr className="h-0 border-t mt-1" />
                                <div className="-mt-3 text-sm text-center">
                                    <span className="px-2 bg-white text-secondary">
                                        Or with
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {providers.map((provider) => {
                                    return (
                                        <button
                                            key={provider}
                                            type="button"
                                            onClick={() =>
                                                handleProviderSignIn(provider)
                                            }
                                            className="button button__secondary inline-flex space-x-2"
                                        >
                                            <img
                                                className="w-6 h-6"
                                                src={`/assets/${provider.id}.svg`}
                                            />
                                            <p>{provider.name}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </section> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

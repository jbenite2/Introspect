import LoginBtn from "./components/login-btn";

export default function Home() {
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
                        <LoginBtn />
                        <div className="flex justify-center items-center">
                            <a
                                href="./signup"
                                className="text-sm text-gray-600 hover:text-gray-500"
                            >
                                Or click here to sign up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

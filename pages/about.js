import React from "react";
import Image from "next/image";
import Navbar from "./components/navbar/navbar";
import { useSession } from "next-auth/react";
import UnauthorizedPage from "./unauthorized";
import Spinner from "./components/spinner/spinner";

function About() {
    const { data: session, status } = useSession();
    if (status == "loading") {
        return <Spinner />;
    }
    if (!session || status == "unauthenticated") {
        return <UnauthorizedPage />;
    }

    return (
        <div className="bg-gradient-to-tr from-purple-600 to-blue-900 min-h-screen">
            <Navbar />
            <section className="pt-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white text-center mb-8">
                        Our Mission
                    </h1>
                    <p className="text-white text-xl max-w-3xl mx-auto text-left">
                    At Introspect, we believe that one of the keys to personal growth and development is the ability to broaden our horizons and gain new perspectives. By exposing ourselves to diverse schools of thought and challenging our existing beliefs, we can expand our understanding of ourselves and the world around us.
                    Introspect accomplishes this mission by offering a survey that can help users explore new ideas and challenge their existing beliefs.
                    By promoting open-mindedness and self-reflection, we hope to foster a more empathetic and connected community.
                    </p>
                </div>
            </section>
            <Image
                src="/thinking-philosopher.png"
                alt="Introspect"
                width={500}
                height={200}
                className="mx-auto"
            />

            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-8">
                        Our Team
                    </h2>
                    <div className="flex flex-wrap justify-center">
                        <div className="max-w-sm mx-auto mb-8">
                            <Image
                                src="/hs-jose.jpg"
                                alt="Team Member"
                                width={300}
                                height={300}
                                style={{ borderRadius: "20px" }}
                            />
                            <h3 className="text-xl font-bold text-white text-center mb-2 mt-5">
                                José Benítez
                            </h3>
                            <p className="text-white text-center">
                                DevOps & Backend Engineer
                            </p>
                        </div>
                        <div className="max-w-sm mx-auto mb-8">
                            <Image
                                src="/hs-christian.jpg"
                                alt="Team Member"
                                width={288}
                                height={300}
                                style={{ borderRadius: "20px" }}
                            />
                            <h3 className="text-xl font-bold text-white text-center mb-2 mt-5">
                                Christian Matthew
                            </h3>
                            <p className="text-white text-center">
                                Frontend Developer
                            </p>
                        </div>
                        <div className="max-w-sm mx-auto mb-8">
                            <Image
                                src="/hs-santiago.jpg"
                                alt="Team Member"
                                width={288}
                                height={300}
                                style={{ borderRadius: "20px" }}
                            />
                            <h3 className="text-xl font-bold text-white text-center mb-2 mt-4">
                                Santiago Rodríguez
                            </h3>
                            <p className="text-white text-center mt-2">
                                IAM & Backend Developer
                            </p>
                        </div>
                        <div className="max-w-sm mx-auto mb-8">
                            <Image
                                src="/hs-dominick.jpg"
                                alt="Team Member"
                                width={283}
                                height={300}
                                style={{ borderRadius: "20px" }}
                            />
                            <h3 className="text-xl font-bold text-white text-center mb-2 mt-5">
                                Dominick
                            </h3>
                            <p className="text-white text-center">
                                Frontend Developer
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;

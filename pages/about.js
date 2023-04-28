import React from 'react';
import Image from 'next/image';
import Navbar from './components/navbar/navbar';
import { useSession } from 'next-auth/react';
import UnauthorizedPage from './unauthorized';

function About() {
	const { data: session, status } = useSession();

	if(!session){
		return (<UnauthorizedPage />)
	}

	return (
		<div className="bg-gradient-to-tr from-purple-600 to-blue-900 min-h-screen">
			<Navbar />
			<section className="pt-12 px-4">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-4xl font-bold text-white text-center mb-8">
						Our Mission
					</h1>
					<p className="text-white text-xl text-center max-w-3xl mx-auto">
						We believe in empowering individuals to take control of their lives
						and improve their well-being. Our mission is to provide the tools
						and resources necessary to help people gain insight into their
						thoughts, feelings, and behaviors, and make positive changes for
						themselves and their communities.
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
								style={{ borderRadius: '20px' }}
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
								style={{ borderRadius: '20px' }}
							/>
							<h3 className="text-xl font-bold text-white text-center mb-2 mt-5">
								Christian Matthew
							</h3>
							<p className="text-white text-center">Frontend Developer</p>
						</div>
						<div className="max-w-sm mx-auto mb-8">
							<Image
								src="/hs-santiago.jpg"
								alt="Team Member"
								width={288}
								height={300}
								style={{ borderRadius: '20px' }}
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
								style={{ borderRadius: '20px' }}
							/>
							<h3 className="text-xl font-bold text-white text-center mb-2 mt-5">
								Dominick
							</h3>
							<p className="text-white text-center">Frontend Developer</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default About;

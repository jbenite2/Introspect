import React from 'react';
import Navbar from './components/navbar/navbar';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

function Dashboard() {
	const { session, loading } = getSession();
	console.log(session, loading);
	const Router = useRouter();
	return (
		<div className="bg-gradient-to-tr from-purple-600 to-blue-900 min-h-screen">
			<Navbar />
			<div className="flex flex-col items-center justify-center h-full">
				<div className="w-full max-w-[500px] lg:ml-[-800px]">
					<Image
						src="/top.png"
						alt="Introspect"
						width={500}
						height={200}
						layout="responsive"
					/>
				</div>
				<h1 className="text-white text-4xl font-bold my-4 lg:my-8 lg:px-4 text-center">
					Welcome to Introspect
				</h1>
				<p className="text-white ptext-lg px-10 mb-8 lg:mb-12 lg:px-4">
					Discover insights about yourself and improve your life.
				</p>
				<button
					onClick={() => Router.push('/survey/instructions')}
					className="bg-white hover:bg-gray-100 text-purple-500 font-semibold py-2 px-4 border border-purple-500 rounded shadow"
				>
					Get started
				</button>
				<div className="w-full max-w-[500px] lg:ml-[+600px]">
					<Image src="/bottom.png" alt="Introspect" width={500} height={200} />
				</div>
			</div>
			<style jsx>{`
				@media (max-width: 640px) {
					.w-full {
						display: none;
					}
				}
			`}</style>
		</div>
	);
}

// export async function getServerSideProps(context) {
// 	const session = await getSession(context);

// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: '/survey/instructions',
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: { session },
// 	};
// }

export default Dashboard;

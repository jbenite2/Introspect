import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const SignupForm = () => {
	const { data: session } = useSession();
	console.log('session: ', session)

	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					phone,
					firstName,
					lastName,
					password,
				}),
			});

			const data = await response.json(); // parse response from server
			console.log(data); // log response from server

			if (response.ok) {
				router.push('/dashboard');
				return res.status(200).json(user, { success: true });
			} else {
				return res.status(500).json({ error: error.message });
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="w-full max-w-md">
				<div>
					<h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
						Sign up
					</h2>
				</div>
				<form
					onSubmit={handleSubmit}
					className="mt-8 space-y-6 "
					action="#"
					method="POST"
				>
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm px-3">
						<div className="mb-4">
							<label htmlFor="email" className="sr-only">
								Email:
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
								className="relative block w-full pl-2 rounded-t-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Email address"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="phone" className="sr-only">
								Phone:
							</label>
							<input
								type="tel"
								id="phone"
								value={phone}
								onChange={(event) => setPhone(event.target.value)}
								required
								className="relative block w-full pl-2 border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Phone number"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="firstName" className="sr-only">
								First Name:
							</label>
							<input
								type="text"
								id="firstName"
								value={firstName}
								onChange={(event) => setFirstName(event.target.value)}
								required
								className="relative block w-full pl-2 border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="First name"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="lastName" className="sr-only">
								Last Name:
							</label>
							<input
								type="text"
								id="lastName"
								value={lastName}
								onChange={(event) => setLastName(event.target.value)}
								required
								className="relative block w-full pl-2 border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="Last name"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="sr-only">
								Password:
							</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
								className="relative block w-full pl-2 rounded-b-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text"
								placeholder="Password"
							/>
						</div>
					</div>
					<button className="btn-primary" type="submit">
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;

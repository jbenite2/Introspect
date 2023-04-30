import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

export default function MyComponent() {
	const [sessionData, setSessionData] = useState(null);

	useEffect(async () => {
		const session = await getSession();
		setSessionData(session);
	}, []);

	if (!sessionData) {
		return <div>Loading session data...</div>;
	}

	return <div>{sessionData.user.email}</div>;
}

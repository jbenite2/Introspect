import React from 'react';
import Navbar from './components/navbar/navbar';
import { useSession } from 'next-auth/react';
import UnauthorizedPage from './unauthorized';

function AnalyticsPage() {
  const { data: session, status } = useSession();

	if(!session){
		return (<UnauthorizedPage />)
	}

  return (
    <div className="bg-gradient-to-tr from-purple-600 to-blue-900 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-[500px]">
        </div>
        <h1 className="text-white text-4xl font-bold my-4 lg:my-8 lg:px-4 text-center">
          Analytics Dashboard
        </h1>

        <button className="bg-white hover:bg-gray-100 text-purple-500 font-semibold py-2 px-4 border border-purple-500 rounded shadow">
          Coming soon...
        </button>
      </div>
    </div>
  );
}

export default AnalyticsPage;

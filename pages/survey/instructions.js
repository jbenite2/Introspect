import React from 'react';
import Navbar from '../components/navbar/navbar';
import Image from 'next/image';
import { useRouter} from 'next/router';

function SurveyLandingPage() {
  const Router = useRouter()

  return (
    <div className="bg-gradient-to-tr from-purple-600 to-blue-900 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-[500px]">
          <Image
            src="/Heart-and-Mind.png"
            alt="Survey"
            width={500}
            height={200}
            layout="responsive"
          />
        </div>
        <h1 className="text-white text-4xl font-bold my-4 lg:my-8 lg:px-4 text-center">
          Welcome to the Survey
        </h1>
        <p className="text-white text-lg px-10 mb-8 lg:mb-8 lg:px-4">
          In this survey, you will encounter several scenarios, and your objective is to carefully select your course of action in each situation.
        </p>
        <p className="text-white text-lg px-10 mb-8 lg:mb-8 lg:px-4">
          The questions are timed, and you should be able to complete them in under three minutes.
        </p>
        <p className="text-white text-lg px-10 mb-8 lg:mb-8 lg:px-4">
          Please answer the questions as honestly and accurately as possible.
        </p>

        <button onClick={() => Router.push('/survey/test')} className="bg-white hover:bg-gray-100 text-purple-500 font-semibold py-2 px-4 border border-purple-500 rounded shadow">
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

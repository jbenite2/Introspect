import { providers, signIn, getSession, csrfToken } from "next-auth/react";
import React from "react";

export default function signin_prop({providers}){
    return (
        <div>
          {Object.values(providers).map((provider) => {
            return (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              </div>
            );
          })}
        </div>
    );
}



export async function getServerSideProps(context) {
    const { req } = context;
    const session = await getSession({ req });
  
    if (session) {
      return {
        redirect: { destination: "/" },
      };
    }
  
    return {
      props: {
        providers: await providers(context),
        csrfToken: await csrfToken(context),
      },
    };
  }
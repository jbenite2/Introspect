export default function Home () {
  return (
    <div className='h-screen'>
      <div className='h-screen flex'>
        <div className='relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden'>
          <div>
            <h1 className='text-white font-bold text-6xl font-sans'>
              Introspect
            </h1>
            <h2 className='text-white text-4 font-sans'>
              A Tech Ethics Project
            </h2>
          </div>
        </div>

        <div className='flex w-1/2 justify-center items-center'>
          <div className='w-full max-w-md space-y-8 p-10 pt-20 pb-20'>
            <div>
              <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900'>
                Log into your account
              </h2>
            </div>
            <form className='mt-8 space-y-6' action='#' method='POST'>
              <input type='hidden' name='remember' value='true' />
              <div className='rounded-md shadow-sm'>
                <div className='mb-4'>
                  <label for='email-address' className='sr-only'>
                    Email address
                  </label>
                  <input
                    id='email-address'
                    name='email'
                    type='email'
                    autocomplete='email'
                    required
                    className='relative block w-full pl-2 rounded-t-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    placeholder='Email address'
                  />
                </div>
                <div className='mb-4'>
                  <label for='password' className='sr-only'>
                    Password
                  </label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autocomplete='current-password'
                    required
                    className='relative block w-full pl-2 rounded-b-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    placeholder='Password'
                  />
                </div>
              </div>

              <div className=''>
                <button
                  type='submit'
                  className='mb-4 btn-primary'
                >
                  Log in
                </button>

                <div className='flex justify-center items-center'>
                  <a
                    href='/signup'
                    className='text-sm text-gray-600 hover:text-gray-500'
                  >
                Or click here to sign up
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

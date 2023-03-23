export default function Home () {
  return (
    <div class='h-screen'>
      <div class='h-screen flex'>
        <div class='relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden'>
          <div>
            <h1 class='text-white font-bold text-6xl font-sans'>
              Introspection
            </h1>
            <h2 className='text-white text-4 font-sans'>
              A Tech Ethics Project
            </h2>
          </div>
        </div>

        <div class='flex w-1/2 justify-center items-center'>
          <div class='w-full max-w-md space-y-8 p-10 pt-20 pb-20'>
            <div>
              <h2 class='text-center text-3xl font-bold tracking-tight text-gray-900'>
                Log into your account
              </h2>
            </div>
            <form class='mt-8 space-y-6' action='#' method='POST'>
              <input type='hidden' name='remember' value='true' />
              <div class='rounded-md shadow-sm'>
                <div class='mb-4'>
                  <label for='email-address' class='sr-only'>
                    Email address
                  </label>
                  <input
                    id='email-address'
                    name='email'
                    type='email'
                    autocomplete='email'
                    required
                    class='relative block w-full pl-2 rounded-t-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    placeholder='Email address'
                  />
                </div>
                <div class='mb-4'>
                  <label for='password' class='sr-only'>
                    Password
                  </label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autocomplete='current-password'
                    required
                    class='relative block w-full pl-2 rounded-b-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    placeholder='Password'
                  />
                </div>
              </div>

              <div class=''>
                <button
                  type='submit'
                  class='mb-4 group relative flex w-full py-3 justify-center rounded-md bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Log in
                </button>

                <div class='flex justify-center items-center'>
                  <a
                    href='#'
                    class='text-sm text-gray-600 hover:text-gray-500'
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

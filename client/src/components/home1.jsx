import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

export const Home1 = () => {
  const isLoggedIn = Auth.loggedIn();
  const navigate = useNavigate();

  // Redirect if user is not logged in (optional, based on your application flow)
  if (!isLoggedIn) {
    navigate("/"); // Redirect to login page or handle as needed
    return null; // Render nothing while redirecting
  }

  return (
    <div className='grid grid-cols-2 w-4/5 mx-auto'>
      <div className='my-5 text-center text-cyan-200 my-auto'>
        <h1 className='text-xl font-bold w-4/5 mx-auto'>
          Tame The List - Your personal assistant to organizing life
        </h1>
        <h2 className='text-lg font-semibold'>
          One list, endless views. Conquer your day!
        </h2>
        {isLoggedIn ? (
          <Link
            to='/boards'
            className='bg-blue-light p-2 rounded-md shadow-md text-slate-800 m-2 w-fit mx-auto'
          >
            Profile
          </Link>
        ) : (
          <div className='grid grid-cols-3 mx-auto w-fit'>
            <input
              type='email'
              placeholder='E-Mail'
              className='p-2 rounded-md shadow-md m-2 col-span-2'
            />
            <Link
              to='/register'
              className='bg-blue-light p-2 rounded-md shadow-md text-slate-800 m-2 w-fit mx-auto'
            >
              Register Now
            </Link>
          </div>
        )}
      </div>
      <img src='adhdlist.jpg' alt='ADHD List' className='mx-auto my-5' />
    </div>
  );
};

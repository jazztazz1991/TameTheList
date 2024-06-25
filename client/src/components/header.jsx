import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import "../index.css";
import logo from "/logo.jpg";
export const Header = () => {
  return (
    <div className='grid grid-cols-2 bg-slate-600 p-3'>
      <div className='text-white grid grid-flow-col auto-cols-max'>
        <Link to='/' className='text-xl font-bold pr-2'>
          <img src={logo} className='' alt='logo' />
        </Link>
        <h3 className='text-lg font-semibold  w-fit'>Organize your life</h3>
      </div>
      <nav className='justify-end col-end-4 w-fit'>
        {Auth.loggedIn ? (
          <Link
            to='/login'
            className='bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50'
          >
            Login
          </Link>
        ) : (
          <ul className='grid grid-cols-4 text-slate-800 font-medium'>
            <Link
              to='/'
              className='bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50'
            >
              Home
            </Link>
            <Link
              to='/boards'
              className='bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50'
            >
              Boards
            </Link>
            <Link
              to='/'
              className='bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50'
            >
              Profile
            </Link>
            <button
              className='bg-blue-light rounded px-2 mx-2 w-fit shadow-md shadow-cyan-500/50'
              onClick={() => Auth.logout()}
            >
              Logout
            </button>
          </ul>
        )}
      </nav>
    </div>
  );
};

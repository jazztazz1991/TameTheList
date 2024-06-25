import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>404 Page Not Found</h1>
      <h1>
        <Link to='/'>Go back to the main page</Link>
      </h1>
    </div>
  );
};

export default Error;

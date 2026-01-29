import { NavLink } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>

      <div>
        <NavLink to="/products">Go to Products</NavLink>
      </div>
    </div>
  );
};

export default Home;

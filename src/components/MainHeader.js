// here below the code that works, but that does not highlight the corresponding link when we are on the page
//(ex: if we are currently in localhost:3000/products  --> the products link is not highlighted and cannot be)
// the way to get this possibility is through NavLink instead of using Link from Router, conf solution two

/*   SOLUTION 1


import { Link } from "react-router-dom";
import classes from "./MainHeader.module.css";
const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;

*/

/*   SOLUTION 2*/
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink to="/welcome" activeClassName={classes.active}>
              {/* refers then to css a.active and not only a:active */}
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" activeClassName={classes.active}>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;

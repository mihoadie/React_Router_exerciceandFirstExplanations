# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

npm install react-router-dom@5

# step 1 import { Route } from "react-router-dom";

step 1: integrate BrowserRouter to the index.js global file
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
<React.StrictMode>
<BrowserRouter>
<App />
</BrowserRouter>
</React.StrictMode>,
document.getElementById("root")
);

# step 2 we determine the routes and put our associated components like this

import React from "react";
import { Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
const App = () => {
return (

<div>
<Route path="/welcome">
<Welcome />
</Route>
<Route path="/products">
<Products />
</Route>
</div>
);
};

# step 3: we can create our src/pages/Welcome.js and Products.js that will be called when url is http://localhost:3000/welcome or http://localhost:3000/products

# step 4: create links to our pages (<a href={}> could be an option but it relaod the page, and so we loose all our store, state...)

so we use the link component (or the NavLink component if we need to highlight the link in css in which we are currently navigating through
confere /components/MainHeader.js to understand the difference)  
<NavLink to="/welcome" activeClassName={classes.active}> --> refers then to css a.active and not only a:active

import { Link } from "react-router-dom";
const MainHeader = () => {
return (

<header>
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

# step 5 : managing variables params in the url and catching it in react component with useParams (!!! keys used in useParams must correspond to the name given in the route (ex /:id must lead to calling useParams with .id and not .iD for example))

App.js file:
import React from "react";
import { Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import MainHeader from "./components/MainHeader";
import ProductDetails from "./pages/ProductDetails";
const App = () => {
return (

<div>
<MainHeader />
<main>
<Route path="/welcome">
<Welcome />
</Route>
<Route path="/products">
<Products />
</Route>
<Route path="/products/:productID/:productName">
<ProductDetails />
</Route>
</main>
</div>
);
};
export default App;

and associated component ProductDetails.js:

import React from "react";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
const params = useParams();
console.log(params.productID); // because in App we declared path="/product-details/:productID"> but we could add as much parameters /: as we want in the app.js, it will be detected in params with the associated key
return (

<section>
<h1>ProductDetails</h1>
<p>{params.productID}</p>
<p>{params.productName}</p>
</section>
);
};

export default ProductDetails;

# step 6 managing switch and exact to get the correct routes

Switch allows to find a match between url in browserand routes below, and at the first match, it stops.
that allows to have only one route called, otherwise, without switch, if we type localhost:3000/products/p1  
 then both Products and ProductDetails will be shown and called!  
to be sure to call the correct route, we can get benefit of switch (taking the first match) PLUS the exact prop,
by doing so, we are guaranteed that Products is the component that will be called only if the url is precisely localhost:3000/products.
if there is in addtion localhost:300/products/p1, Products will not be called because the match is not exact so the switch will go further untill ProductDetails call route

in App.js file:
import React from "react";
import { Route, Switch } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import MainHeader from "./components/MainHeader";
import ProductDetails from "./pages/ProductDetails";
const App = () => {
return (

<div>
<MainHeader />
<main>
<Switch>

          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:productID">
            <ProductDetails />
          </Route>
        </Switch>
      </main>
    </div>

);
};

export default App;

# step 7 we can put nested route in components called after a first route! ex: in Welcome.js component, i can still use route from react-dom-router to get nested route management like below

import { Route } from "react-router-dom";

const Welcome = () => {
return (

<section>
<h1>The Welcome Page</h1>
<Route path="/welcome/new-user">
<!-- of course that means that path must start by /welcome/ otherwise the Welcome component will never be called so this code wont be executed! logically! -->
<p>Welcome New User</p>
</Route>
</section>
);
};
export default Welcome;

# step 8 ; Redirect component, inside a route, is a good way to redirect user in case a domain/url. but important to add exact props t avoid suprises beacause overwise, the swtich first match will run and then it messes it all! here below the user typing localhost:3000 is redirected to localhost:3000/welcome

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import MainHeader from "./components/MainHeader";
import ProductDetails from "./pages/ProductDetails";
const App = () => {
return (

<div>
<MainHeader />
<main>
<Switch>
<Route path="/" exact>
<Redirect to="/welcome" />
</Route>
<Route path="/welcome">
<Welcome />
</Route>
<Route path="/products" exact>
<Products />
</Route>
<Route path="/products/:productID">
<ProductDetails />
</Route>
</Switch>
</main>
</div>
);
};

export default App;

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

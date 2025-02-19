import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Website/Home';
import GoogleCallback from './Pages/Auth/GoogleCallback';
import Dashboard from './Pages/Dashboard/Dashboards';
import RequireAuth from './Pages/Auth/RequireAuth';
import RequireBack from './Pages/Auth/RequireBack';
import Err404 from './Components/Errors/Err404';
import Users from "../src/Pages/Dashboard/Users/Users";
import User from "../src/Pages/Dashboard/Users/User";
import AddUser from "../src/Pages/Dashboard/Users/AddUser";
import Categories from "../src/Pages/Dashboard/Categories/Categories";
import Category from "../src/Pages/Dashboard/Categories/Category";
import AddCategories from "../src/Pages/Dashboard/Categories/AddCategories";
import Products from './Pages/Dashboard/Products/Products';
import AddProduct from './Pages/Dashboard/Products/AddProduct';
import Website from './Pages/Website/Website';
import WebCategories from './Pages/Website/WebCategories';
import EditProduct from './Pages/Dashboard/Products/EditProduct';
import Sale from './Components/Website/Product/Sale/Sale';
import SingleProduct from './Pages/Website/SingleProduct';
// import "./custom.scss"



function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<Website />}>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<WebCategories />} />
          <Route path='/all-best-price' element={<Sale length={5} />} />
          <Route path='product/:id' element={<SingleProduct />} />
        </Route>
        <Route element={<RequireBack />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='/auth/google/callback' element={<GoogleCallback />} />
        <Route path='/*' element={<Err404 />} />
        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />} >
          <Route path='/dashboard' element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />} >
              <Route path='users' element={<Users />} />
              <Route path='users/:id' element={<User />} />
              <Route path='user/add' element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1999"]} />} >
              {/* Categories */}
              <Route path='categories' element={<Categories />} />
              <Route path='categories/add' element={<AddCategories />} />
              <Route path='categories/:id' element={<Category />} />
              {/* Products */}
              <Route path='products' element={<Products />} />
              <Route path='products/add' element={<AddProduct />} />
              <Route path='products/:id' element={<EditProduct />} />
            </Route>

          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;

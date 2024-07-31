import { React, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import ProductAdmin from './admin/ProductAdmin';
import Shop from './screens/Shop';
import LayoutScreen from './component/LayoutScreen';
import Register from './screens/register';
import { AuthProvider } from './context/AuthContext';
import NotFound from './screens/NotFound';
import './App.css';
import Contact from './screens/Contact';
import AdminLogin from './admin/AdminLogin';
import LayoutAdmin from './admin/LayoutAdmin';
import OrderList from './admin/OrderList';
import NotFoundAdmin from './admin/NotFoundAdmin';
import RegisterAdmin from './admin/RegisterAdmin';


const defaultProducts = [
  { id: 1, ProductName: 'TITANIUM PARA-BOTTLE™', ProductPrice: 44.99, ProductDetails: 'The Ultimate Backcountry Water Bottle', Category: 'Titanium', Color: 'Dark grey', imageUrl: 'https://vargooutdoors.com/cdn/shop/products/PARA-BOTTLE-2_521x521.jpg?v=1668783290' },
  { id: 2, ProductName: 'Sports Bottle', ProductPrice: 4.99, ProductDetails: '304 Stainless Steel', Category: 'Steel', Color: 'Blue', imageUrl: 'https://sc04.alicdn.com/kf/H48b651da472e41af95f1bfebcf27db98s.jpg' },
  { id: 3, ProductName: 'Kiyo UVC Water Bottle', ProductPrice: 80, ProductDetails: 'Pure water at your fingertips', Category: 'Steel', Color: 'Carbon Black', imageUrl: 'https://monos.com/cdn/shop/products/Kiyo-UVC-Bottle-500ml-Black_900x.png?v=1678605782' },
  {
    id: 4, ProductName: 'Best Dad Ever White Aluminum Water Bottle', ProductPrice: 70, ProductDetails: "Great Gift for Father's Day, Birthday, or Christmas Gift for Dad, Grandpa, Papa, Husband", Category: 'Aluminum', Color: 'Grey',
    imageUrl: 'https://i5.walmartimages.com/seo/Best-Dad-Ever-White-Aluminum-Water-Bottle-Great-Gift-for-Father-s-Day-Birthday-or-Christmas-Gift-for-Dad-Grandpa-Papa-Husband_457d0a97-5b07-47eb-ac86-969422fce782.da1480e184c81332d3b8c063154e90c4.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF'
  },
];
const defaultCategory = [
  'Steel',
  'Titanium',
  'Aluminum'
]


const App = () => {
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    const storedCategory = JSON.parse(localStorage.getItem('categories'));

    if (!storedProducts && !storedCategory) {
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      localStorage.setItem('categories', JSON.stringify(defaultCategory));

    }
  }, []);
  const isLogin = () => {
    return localStorage.getItem('token') === 'loggedIn'; // Use strict equality
  };
  const isLoginAdmin = () => {
    return localStorage.getItem('admin') === 'loggedIn'; // Use strict equality
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {isLoginAdmin() ? (<Route path='/admin/' element={<LayoutAdmin />}>
            <Route path="/admin/product" element={<ProductAdmin />} />
            <Route path="/admin/order-list" element={<OrderList />} />
            <Route path="/admin/*" element={<NotFoundAdmin />} />

          </Route>
          ) : <>
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/registeradmin" element={<RegisterAdmin/>} />
            </>}
          {isLogin() ? (
            <Route path="/" element={<LayoutScreen />}>
              <Route path="/shop" element={<Shop />} />
              <Route path="/contact" element={<Contact />} />
              {/* Add more protected routes here */}
              <Route path="/*" element={<NotFound />} />
            </Route>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

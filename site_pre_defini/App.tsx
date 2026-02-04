import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import NewDelivery from './pages/admin/NewDelivery';
import GalleryManagement from './pages/admin/GalleryManagement';
import ClientGalleryView from './pages/client/ClientGalleryView';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/Shop/CartDrawer';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CartProvider>
                <Router>
                    {/* Client Gallery View - No Layout */}
                    <Routes>
                        <Route path="/g/:uuid" element={<ClientGalleryView />} />

                        {/* Main Site with Layout */}
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />

                            {/* Admin Routes */}
                            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                <Route path="/admin/new-delivery" element={<NewDelivery />} />
                                <Route path="/admin/gallery/:uuid" element={<GalleryManagement />} />
                            </Route>
                        </Route>
                    </Routes>
                    <CartDrawer />
                </Router>
            </CartProvider>
        </ThemeProvider>
    );
}

export default App;

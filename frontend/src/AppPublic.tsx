
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/theme/theme';
import { getSubdomainInfo } from '@/utils/subdomain';

// Public Pages
import LandingPage from '@/pages/LandingPage';
import PricingPage from '@/pages/PricingPage';

// Template Pages
import TemplateLayout from '@/template/components/Layout/Layout';
import TemplateHome from '@/template/pages/Home';
import TemplatePortfolio from '@/template/pages/Portfolio';
import TemplateShop from '@/template/pages/Shop';
import TemplateContact from '@/template/pages/Contact';
import TemplateAbout from '@/template/pages/About';

function AppPublic() {
    const { slug: photographerSlug } = getSubdomainInfo();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    {/* Site Photographe (via subdomain ou slug) */}
                    <Route path="/:slug" element={<TemplateLayout />}>
                        <Route index element={<TemplateHome />} />
                        <Route path="portfolio" element={<TemplatePortfolio />} />
                        <Route path="shop" element={<TemplateShop />} />
                        <Route path="contact" element={<TemplateContact />} />
                        <Route path="about" element={<TemplateAbout />} />
                    </Route>

                    {/* Fallback for subdomain-based access */}
                    {photographerSlug && (
                        <Route path="/*" element={<TemplateLayout slug={photographerSlug} />}>
                            <Route index element={<TemplateHome />} />
                            <Route path="portfolio" element={<TemplatePortfolio />} />
                            <Route path="shop" element={<TemplateShop />} />
                            <Route path="contact" element={<TemplateContact />} />
                            <Route path="about" element={<TemplateAbout />} />
                        </Route>
                    )}

                    {/* Pages Publiques */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/pricing" element={<PricingPage />} />

                    {/* 404 */}
                    <Route path="*" element={
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', fontFamily: 'system-ui' }}>
                            <h1 style={{ fontSize: '4rem', margin: 0, color: '#ef4444' }}>404</h1>
                            <p style={{ fontSize: '1.2rem', color: '#666' }}>Page non trouvée (Public)</p>
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default AppPublic;

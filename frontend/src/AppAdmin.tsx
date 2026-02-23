import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/theme/theme';
import { useBuilder } from '@/hooks/useBuilder';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import NewDelivery from '@/pages/admin/NewDelivery';
import GalleryManagement from '@/pages/admin/GalleryManagement';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import SiteBuilder from '@/pages/admin/SiteBuilder';
import AdminLayout from '@/components/Layout/AdminLayout';
import ClientGalleryView from '@/pages/client/ClientGalleryView';

// Builder Wizard
import { BuilderLayout } from '@/builder/BuilderLayout';
import { WelcomeStep } from '@/builder/steps/WelcomeStep';
import { InfoStep } from '@/builder/steps/InfoStep';
import { BrandingStep } from '@/builder/steps/BrandingStep';
import { HeroStep } from '@/builder/steps/HeroStep';
import { PortfolioStep } from '@/builder/steps/PortfolioStep';
import { ServicesStep } from '@/builder/steps/ServicesStep';
import { PricingStep } from '@/builder/steps/PricingStep';
import { TestimonialsStep } from '@/builder/steps/TestimonialsStep';
import { ContactStep } from '@/builder/steps/ContactStep';
import { PreviewStep } from '@/builder/steps/PreviewStep';

function BuilderApp() {
    const { config, currentStep, updateConfig, addPhoto, addPhotos, removePhoto, addService, removeService, updateService, addPricingPlan, removePricingPlan, updatePricingPlan, addTestimonial, removeTestimonial, updateTestimonial, nextStep, prevStep, goToStep, resetConfig } = useBuilder();

    const renderStep = () => {
        switch (currentStep) {
            case 0: return <WelcomeStep onNext={nextStep} />;
            case 1: return <InfoStep config={config} onUpdate={updateConfig} onNext={nextStep} onPrev={prevStep} />;
            case 2: return <BrandingStep config={config} onUpdate={updateConfig} onNext={nextStep} onPrev={prevStep} />;
            case 3: return <HeroStep config={config} onUpdate={updateConfig} onNext={nextStep} onPrev={prevStep} />;
            case 4: return <PortfolioStep config={config} onAddPhoto={addPhoto} onAddPhotos={addPhotos} onRemovePhoto={removePhoto} onNext={nextStep} onPrev={prevStep} />;
            case 5: return <ServicesStep config={config} onAddService={addService} onRemoveService={removeService} onUpdateService={updateService} onNext={nextStep} onPrev={prevStep} />;
            case 6: return <PricingStep config={config} onAddPlan={addPricingPlan} onRemovePlan={removePricingPlan} onUpdatePlan={updatePricingPlan} onNext={nextStep} onPrev={prevStep} />;
            case 7: return <TestimonialsStep config={config} onAddTestimonial={addTestimonial} onRemoveTestimonial={removeTestimonial} onUpdateTestimonial={updateTestimonial} onNext={nextStep} onPrev={prevStep} />;
            case 8: return <ContactStep config={config} onUpdate={updateConfig} onNext={nextStep} onPrev={prevStep} />;
            case 9: return <PreviewStep config={config} onReset={resetConfig} onPrev={prevStep} />;
            default: return <WelcomeStep onNext={nextStep} />;
        }
    };

    return (
        <BuilderLayout currentStep={currentStep} onStepChange={goToStep} onNext={nextStep} onPrev={prevStep}>
            {renderStep()}
        </BuilderLayout>
    );
}

function AppAdmin() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    {/* Auth */}
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<SignUp />} />
                    <Route path="/login" element={<Navigate to="/auth/login" replace />} />
                    <Route path="/signup" element={<Navigate to="/auth/register" replace />} />

                    {/* Admin protégé */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/new-delivery" element={<NewDelivery />} />
                            <Route path="/admin/gallery/:uuid" element={<GalleryManagement />} />
                            <Route path="/admin/site-builder" element={<SiteBuilder />} />
                            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                        </Route>
                    </Route>

                    {/* Builder standalone */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/builder" element={<BuilderApp />} />
                    </Route>

                    {/* Galerie client partagée (peut être ici ou public, gardons ici pour accès auth si besoin) */}
                    <Route path="/g/:uuid" element={<ClientGalleryView />} />

                    {/* 404 */}
                    <Route path="*" element={
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', fontFamily: 'system-ui' }}>
                            <h1 style={{ fontSize: '4rem', margin: 0, color: '#ef4444' }}>404</h1>
                            <p style={{ fontSize: '1.2rem', color: '#666' }}>Page non trouvée (Admin)</p>
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default AppAdmin;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useBuilder } from '@/hooks/useBuilder';

// ============================================
// BUILDER IMPORTS
// ============================================
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

// ============================================
// TEMPLATE IMPORTS  
// ============================================
import TemplateLayout from '@/template/components/Layout/Layout';
import TemplateHome from '@/template/pages/Home';
import TemplatePortfolio from '@/template/pages/Portfolio';
import TemplateShop from '@/template/pages/Shop';
import TemplateContact from '@/template/pages/Contact';
import TemplateAbout from '@/template/pages/About';

// Composant Builder App (comme avant)
function BuilderApp() {
  const {
    config,
    currentStep,
    updateConfig,
    addPhoto,
    removePhoto,
    addService,
    removeService,
    updateService,
    addPricingPlan,
    removePricingPlan,
    updatePricingPlan,
    addTestimonial,
    removeTestimonial,
    updateTestimonial,
    nextStep,
    prevStep,
    goToStep,
    resetConfig
  } = useBuilder();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={nextStep} />;

      case 1:
        return (
          <InfoStep
            config={config}
            onUpdate={updateConfig}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 2:
        return (
          <BrandingStep
            config={config}
            onUpdate={updateConfig}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 3:
        return (
          <HeroStep
            config={config}
            onUpdate={updateConfig}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 4:
        return (
          <PortfolioStep
            config={config}
            onAddPhoto={addPhoto}
            onRemovePhoto={removePhoto}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 5:
        return (
          <ServicesStep
            config={config}
            onAddService={addService}
            onRemoveService={removeService}
            onUpdateService={updateService}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 6:
        return (
          <PricingStep
            config={config}
            onAddPlan={addPricingPlan}
            onRemovePlan={removePricingPlan}
            onUpdatePlan={updatePricingPlan}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 7:
        return (
          <TestimonialsStep
            config={config}
            onAddTestimonial={addTestimonial}
            onRemoveTestimonial={removeTestimonial}
            onUpdateTestimonial={updateTestimonial}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 8:
        return (
          <ContactStep
            config={config}
            onUpdate={updateConfig}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );

      case 9:
        return (
          <PreviewStep
            config={config}
            onReset={resetConfig}
            onPrev={prevStep}
          />
        );

      default:
        return <WelcomeStep onNext={nextStep} />;
    }
  };

  return (
    <BuilderLayout
      currentStep={currentStep}
      onStepChange={goToStep}
      onNext={nextStep}
      onPrev={prevStep}
    >
      {renderStep()}
    </BuilderLayout>
  );
}

// App principal avec les deux namespaces
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================================
            ROUTES BUILDER (Configuration Admin)
            ==========================================
            
            Wizard de configuration en 10 étapes
        */}
        <Route path="/builder" element={<BuilderApp />} />

        {/* =========================================
            ROUTES TEMPLATE (Sites Publics)
            =========================================
            
            :slug = identifiant unique du photographe
            Exemples:
            - /jean-dupont → Home de Jean Dupont
            - /marie-photo/portfolio → Portfolio de Marie
        */}
        <Route path="/:slug" element={<TemplateLayout />}>
          <Route index element={<TemplateHome />} />
          <Route path="portfolio" element={<TemplatePortfolio />} />
          <Route path="shop" element={<TemplateShop />} />
          <Route path="contact" element={<TemplateContact />} />
          <Route path="about" element={<TemplateAbout />} />
        </Route>

        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/builder" replace />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              flexDirection: 'column'
            }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404</h1>
              <p>Page non trouvée</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

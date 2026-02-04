import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useBuilder } from '@/hooks/useBuilder';
import { BuilderLayout } from '@/components/builder/BuilderLayout';
import { WelcomeStep } from '@/components/builder/steps/WelcomeStep';
import { InfoStep } from '@/components/builder/steps/InfoStep';
import { BrandingStep } from '@/components/builder/steps/BrandingStep';
import { HeroStep } from '@/components/builder/steps/HeroStep';
import { PortfolioStep } from '@/components/builder/steps/PortfolioStep';
import { ServicesStep } from '@/components/builder/steps/ServicesStep';
import { PricingStep } from '@/components/builder/steps/PricingStep';
import { TestimonialsStep } from '@/components/builder/steps/TestimonialsStep';
import { ContactStep } from '@/components/builder/steps/ContactStep';
import { PreviewStep } from '@/components/builder/steps/PreviewStep';
import { PublicSiteView } from '@/components/public/PublicSiteView';

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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BuilderApp />} />
        <Route path="/sites/:slug" element={<PublicSiteView />} />
      </Routes>
    </Router>
  );
}

export default App;


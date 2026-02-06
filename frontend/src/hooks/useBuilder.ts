import { useState, useCallback, useEffect } from 'react';
import type { SiteConfig } from '@/types/builder';
import { defaultSiteConfig } from '@/types/builder';
import { siteConfigService } from '@/services/siteConfigService';

export function useBuilder() {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const configs = await siteConfigService.getMyConfigs();
        if (configs && configs.length > 0) {
          // Found existing config, load it and skip welcome step
          setConfig(configs[0].config_data);
          setCurrentStep(1); // Go directly to Info step
        }
      } catch (error) {
        console.error("Failed to load site config:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadConfig();
  }, []);

  const updateConfig = useCallback((updates: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const updateNestedConfig = useCallback(<K extends keyof SiteConfig>(
    key: K,
    value: SiteConfig[K]
  ) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  const addPhoto = useCallback((photo: { url: string; category: string }) => {
    const newPhoto = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...photo
    };
    setConfig(prev => ({
      ...prev,
      photos: [...prev.photos, newPhoto]
    }));
  }, []);

  const addPhotos = useCallback((newPhotos: { url: string; category: string }[]) => {
    const photosWithIds = newPhotos.map((photo, index) => ({
      id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      ...photo
    }));
    setConfig(prev => ({
      ...prev,
      photos: [...prev.photos, ...photosWithIds]
    }));
  }, []);

  const removePhoto = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      photos: prev.photos.filter(p => p.id !== id)
    }));
  }, []);

  const addService = useCallback((service: Omit<typeof config.services[0], 'id'>) => {
    const newService = {
      id: Date.now().toString(),
      ...service
    };
    setConfig(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  }, []);

  const removeService = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  }, []);

  const updateService = useCallback((id: string, updates: Partial<typeof config.services[0]>) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  }, []);

  const addPricingPlan = useCallback((plan: Omit<typeof config.pricingPlans[0], 'id'>) => {
    const newPlan = {
      id: Date.now().toString(),
      ...plan
    };
    setConfig(prev => ({
      ...prev,
      pricingPlans: [...prev.pricingPlans, newPlan]
    }));
  }, []);

  const removePricingPlan = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      pricingPlans: prev.pricingPlans.filter(p => p.id !== id)
    }));
  }, []);

  const updatePricingPlan = useCallback((id: string, updates: Partial<typeof config.pricingPlans[0]>) => {
    setConfig(prev => ({
      ...prev,
      pricingPlans: prev.pricingPlans.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  }, []);

  const addTestimonial = useCallback((testimonial: Omit<typeof config.testimonials[0], 'id'>) => {
    const newTestimonial = {
      id: Date.now().toString(),
      ...testimonial
    };
    setConfig(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, newTestimonial]
    }));
  }, []);

  const removeTestimonial = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  }, []);

  const updateTestimonial = useCallback((id: string, updates: Partial<typeof config.testimonials[0]>) => {
    setConfig(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === id ? { ...t, ...updates } : t)
    }));
  }, []);

  const toggleSection = useCallback((section: keyof typeof config.enabledSections) => {
    setConfig(prev => ({
      ...prev,
      enabledSections: {
        ...prev.enabledSections,
        [section]: !prev.enabledSections[section]
      }
    }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 9));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, 9)));
  }, []);

  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode(prev => !prev);
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultSiteConfig);
    setCurrentStep(0);
  }, []);

  const exportConfig = useCallback(() => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  return {
    config,
    currentStep,
    isPreviewMode,
    isLoading,
    updateConfig,
    updateNestedConfig,
    addPhoto,
    addPhotos,
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
    toggleSection,
    nextStep,
    prevStep,
    goToStep,
    togglePreviewMode,
    resetConfig,
    exportConfig
  };
}

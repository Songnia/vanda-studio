import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Button } from '@mui/material';
import Hero from '../components/Home/Hero';
import ServicesSection from '../components/Home/ServicesSection';
import PricingSection from '../components/Home/PricingSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import FlashInfo from '../components/Home/FlashInfo';
import FilterChips from '../components/Portfolio/FilterChips';
import MasonryGrid from '../components/Portfolio/MasonryGrid';
import WhatsAppFAB from '../components/Common/WhatsAppFAB';
import PromoBubble from '../components/Home/PromoBubble';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Work');
    const [visibleCount, setVisibleCount] = useState(9);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setVisibleCount(9); // Reset visible count when category changes
    };

    const navigate = useNavigate();

    const handleLoadMore = () => {
        navigate('/portfolio', { state: { selectedCategory } });
    };

    return (
        <Box sx={{ width: '100%', m: 0, p: 0 }}>
            <Hero />
            <Container
                maxWidth="lg"
                sx={{
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 3, md: 6 },
                }}
            >
                <FlashInfo />
                <Box sx={{ mb: { xs: 3, md: 5 } }}>
                    <FilterChips
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategoryChange}
                    />
                </Box>
                <MasonryGrid
                    selectedCategory={selectedCategory}
                    visibleCount={visibleCount}
                />

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<AddCircleOutlineIcon />}
                        onClick={handleLoadMore}
                        sx={{
                            backgroundColor: '#FFD700', // Yellow
                            color: 'black',
                            px: 4,
                            py: 1.5,
                            borderRadius: 50, // Rounded pill shape or just rounded? User didn't specify, but standard button usually 4px or pill. Let's stick to standard or slight round.
                            fontWeight: 'bold',
                            boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                            '&:hover': {
                                backgroundColor: '#F0C800',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Voir plus de {selectedCategory === 'All Work' ? 'projets' : selectedCategory}
                    </Button>
                </Box>
            </Container>
            <ServicesSection />
            <PricingSection />

            {/* <SkillsetSection /> */}

            <TestimonialsSection />
            <WhatsAppFAB />
            <PromoBubble />
        </Box>
    );
};

export default Home;

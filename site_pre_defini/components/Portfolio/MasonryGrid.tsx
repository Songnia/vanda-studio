import React from 'react';
import { Box } from '@mui/material';
import PortfolioCard from './PortfolioCard';
import { useSiteConfig } from '../../../src/context/SiteConfigContext';

import p1 from '../../assets/portfolio/portfolio-1.jpg';
import p2 from '../../assets/portfolio/portfolio-2.jpg';
import p3 from '../../assets/portfolio/portfolio-3.jpg';
import p4 from '../../assets/portfolio/portfolio-4.jpg';
import p5 from '../../assets/portfolio/portfolio-5.jpg';
import p6 from '../../assets/portfolio/portfolio-6.jpg';
import p7 from '../../assets/portfolio/portfolio-7.jpg';
import p8 from '../../assets/portfolio/portfolio-8.jpg';
import p9 from '../../assets/portfolio/portfolio-9.png';
import p10 from '../../assets/portfolio/portfolio-10.jpg';
import p11 from '../../assets/portfolio/portfolio-11.jpg';
import p12 from '../../assets/portfolio/portfolio-12.jpg';


const mockItems = [
    { id: 1, title: 'Wedding Celebration', category: 'Mariages', image: p1, aspectRatio: '4/5' },
    { id: 2, title: 'Maternity Session', category: 'Grossesse', image: p2, aspectRatio: '4/5' },
    { id: 3, title: 'Newborn & Kids', category: 'Bébés & Enfants', image: p3, aspectRatio: '1/1' },
    { id: 4, title: 'Corporate Headshots', category: 'Corporate', image: p4, aspectRatio: '3/4' },
    { id: 5, title: 'Live Concert', category: 'Events', image: p5, aspectRatio: '16/9' },
    { id: 6, title: 'Birthday Shoot', category: 'Events', image: p6, aspectRatio: '4/5' },
    { id: 7, title: 'Portrait Session', category: 'Studio', image: p7, aspectRatio: '3/4' },
    { id: 8, title: 'Event Moments', category: 'Events', image: p8, aspectRatio: '4/3' },
    { id: 9, title: 'Creative Studio', category: 'Studio', image: p9, aspectRatio: '1/1' },
    { id: 10, title: 'Fashion Editorial', category: 'Studio', image: p10, aspectRatio: '4/5' },
    { id: 11, title: 'Lifestyle Shoot', category: 'Studio', image: p11, aspectRatio: '1/1' },
    { id: 12, title: 'Urban Portrait', category: 'Studio', image: p12, aspectRatio: '3/4' },
];

interface MasonryGridProps {
    selectedCategory: string;
    visibleCount: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ selectedCategory, visibleCount }) => {
    const { config } = useSiteConfig();

    // Use config.photos if available, otherwise use mock data
    const portfolioItems = config.photos.length > 0
        ? config.photos.map(photo => ({
            id: photo.id,
            title: photo.title,
            category: photo.category,
            image: photo.url,
            aspectRatio: '4/5' // Default aspect ratio
        }))
        : mockItems;

    const filteredItems = selectedCategory === 'All Work'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === selectedCategory);

    const displayedItems = filteredItems.slice(0, visibleCount);

    return (
        <Box
            sx={{
                columnCount: { xs: 2, sm: 2, md: 2, lg: 3 }, // 2 columns on mobile
                columnGap: { xs: 1, sm: 3, md: 4 }, // Smaller gap on mobile
                pb: { xs: 4, md: 8 },
            }}
        >
            {displayedItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
            ))}
        </Box>
    );
};

export default MasonryGrid;

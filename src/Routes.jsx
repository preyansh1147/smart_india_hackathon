import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PersonalGuidanceCenter from './pages/personal-guidance-center';
import HomepageEducationalTechnologyPlatform from './pages/homepage-educational-technology-platform';
import ResourceTimelineHub from './pages/resource-timeline-hub';
import CollegeIntelligenceDashboard from './pages/college-intelligence-dashboard';
import ParentEducatorPortal from './pages/parent-educator-portal';
import CareerDiscoveryPortal from './pages/career-discovery-portal';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CareerDiscoveryPortal />} />
        <Route path="/personal-guidance-center" element={<PersonalGuidanceCenter />} />
        <Route path="/homepage-educational-technology-platform" element={<HomepageEducationalTechnologyPlatform />} />
        <Route path="/resource-timeline-hub" element={<ResourceTimelineHub />} />
        <Route path="/college-intelligence-dashboard" element={<CollegeIntelligenceDashboard />} />
        <Route path="/parent-educator-portal" element={<ParentEducatorPortal />} />
        <Route path="/career-discovery-portal" element={<CareerDiscoveryPortal />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

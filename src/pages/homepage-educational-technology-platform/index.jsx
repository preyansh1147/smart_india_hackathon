import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import HowItWorksSection from './components/HowItWorksSection';
import SuccessStoriesSection from './components/SuccessStoriesSection';
import TrustIndicatorsSection from './components/TrustIndicatorsSection';
import ChatbotWidget from './components/ChatbotWidget';
import FooterSection from './components/FooterSection';

const HomepageEducationalTechnologyPlatform = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>PathFinder Pro - Empowered Choices, Limitless Futures | Career Guidance Platform</title>
        <meta 
          name="description" 
          content="India's #1 AI-powered career guidance platform. Get personalized stream recommendations, college intelligence, and expert counseling. Democratizing quality career guidance for every Indian student." 
        />
        <meta 
          name="keywords" 
          content="career guidance, stream selection, college admission, career counseling, education technology, Indian students, PathFinder Pro, AI career guidance" 
        />
        <meta name="author" content="PathFinder Pro" />
        <meta property="og:title" content="PathFinder Pro - Your Career Journey Starts Here" />
        <meta 
          property="og:description" 
          content="Empowering Indian students with AI-driven career guidance and personalized educational pathways. Join 50,000+ students who found their perfect career path." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pathfinderpro.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PathFinder Pro - Career Guidance Platform" />
        <meta 
          name="twitter:description" 
          content="India's most trusted career guidance platform. Get personalized recommendations and expert support for your educational journey." 
        />
        <link rel="canonical" href="https://pathfinderpro.in" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Real-time Statistics */}
          <StatsSection />

          {/* How It Works */}
          <HowItWorksSection />

          {/* Success Stories */}
          <SuccessStoriesSection />

          {/* Trust Indicators */}
          <TrustIndicatorsSection />
        </main>

        {/* Footer */}
        <FooterSection />

        {/* Floating Chatbot Widget */}
        <ChatbotWidget />
      </div>
    </>
  );
};

export default HomepageEducationalTechnologyPlatform;
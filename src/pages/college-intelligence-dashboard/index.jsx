import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import Header from '../../components/ui/Header';
import CollegeCard from './components/CollegeCard';
import FilterPanel from './components/FilterPanel';
import ComparisonTable from './components/ComparisonTable';
import AdmissionTracker from './components/AdmissionTracker';
import VirtualTourModal from './components/VirtualTourModal';
import CollegeDetailsModal from './components/CollegeDetailsModal';

const CollegeIntelligenceDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeView, setActiveView] = useState('grid');
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showCollegeDetails, setShowCollegeDetails] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: 28.6139, lng: 77.2090 });

  const [filters, setFilters] = useState({
    state: 'All States',
    courseType: '',
    maxFees: 100000,
    quota: '',
    hostel: false,
    minRating: 0,
    maxDistance: 100,
    placement: 0
  });

  // Mock college data
  const mockColleges = [
    {
      id: 1,
      name: "Delhi Technological University",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
      rating: 4.5,
      fees: 45000,
      placement: 92,
      cutoff: 85,
      distance: 15,
      quota: "General",
      hostel: true,
      facultyRatio: 12,
      established: 1941,
      courses: ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "MBA"],
      topCompanies: ["Microsoft", "Google", "Amazon", "TCS", "Infosys"],
      averagePackage: "8.5",
      highestPackage: "42",
      coordinates: { lat: 28.7503, lng: 77.1175 }
    },
    {
      id: 2,
      name: "Netaji Subhas University of Technology",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
      rating: 4.2,
      fees: 38000,
      placement: 88,
      cutoff: 82,
      distance: 22,
      quota: "General",
      hostel: true,
      facultyRatio: 15,
      established: 1983,
      courses: ["B.Tech CSE", "B.Tech IT", "B.Tech ECE", "MCA"],
      topCompanies: ["Wipro", "Accenture", "IBM", "Cognizant"],
      averagePackage: "7.2",
      highestPackage: "28",
      coordinates: { lat: 28.6850, lng: 77.3362 }
    },
    {
      id: 3,
      name: "Indira Gandhi Delhi Technical University",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=800",
      rating: 4.0,
      fees: 42000,
      placement: 85,
      cutoff: 78,
      distance: 18,
      quota: "General",
      hostel: false,
      facultyRatio: 18,
      established: 1999,
      courses: ["B.Tech CSE", "B.Tech EE", "B.Tech CE", "MBA"],
      topCompanies: ["HCL", "Tech Mahindra", "Capgemini", "L&T"],
      averagePackage: "6.8",
      highestPackage: "22",
      coordinates: { lat: 28.6304, lng: 77.2177 }
    },
    {
      id: 4,
      name: "Guru Gobind Singh Indraprastha University",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800",
      rating: 4.3,
      fees: 35000,
      placement: 90,
      cutoff: 80,
      distance: 25,
      quota: "General",
      hostel: true,
      facultyRatio: 14,
      established: 1998,
      courses: ["B.Tech CSE", "B.Tech BT", "BBA", "B.Com"],
      topCompanies: ["Deloitte", "EY", "KPMG", "PwC"],
      averagePackage: "7.5",
      highestPackage: "35",
      coordinates: { lat: 28.6692, lng: 77.4538 }
    },
    {
      id: 5,
      name: "Jamia Millia Islamia University",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800",
      rating: 4.1,
      fees: 28000,
      placement: 83,
      cutoff: 75,
      distance: 20,
      quota: "Minority",
      hostel: true,
      facultyRatio: 16,
      established: 1920,
      courses: ["B.Tech CSE", "B.Arch", "BA", "MA"],
      topCompanies: ["Infosys", "TCS", "Wipro", "Adobe"],
      averagePackage: "6.2",
      highestPackage: "18",
      coordinates: { lat: 28.5615, lng: 77.2802 }
    },
    {
      id: 6,
      name: "Bharati Vidyapeeth\'s College of Engineering",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
      rating: 3.9,
      fees: 48000,
      placement: 78,
      cutoff: 72,
      distance: 30,
      quota: "General",
      hostel: false,
      facultyRatio: 20,
      established: 1999,
      courses: ["B.Tech CSE", "B.Tech ME", "B.Tech EE"],
      topCompanies: ["Maruti Suzuki", "Hero MotoCorp", "Bajaj Auto"],
      averagePackage: "5.8",
      highestPackage: "15",
      coordinates: { lat: 28.5245, lng: 77.1855 }
    }
  ];

  // Mock application data
  const mockApplications = [
    {
      id: 1,
      collegeName: "Delhi Technological University",
      course: "B.Tech Computer Science",
      applicationId: "DTU2025001234",
      status: "submitted",
      deadline: "2025-06-30",
      submittedDate: "2025-03-15",
      applicationFee: 1000,
      nextStep: "Entrance Exam",
      priority: "high",
      documentsRequired: 8,
      documents: [
        { name: "10th Certificate", submitted: true },
        { name: "12th Certificate", submitted: true },
        { name: "JEE Scorecard", submitted: false },
        { name: "Category Certificate", submitted: true }
      ],
      lastUpdated: "2025-03-20T10:30:00Z",
      updateMessage: "Application successfully submitted. Entrance exam scheduled for July 15, 2025."
    },
    {
      id: 2,
      collegeName: "Netaji Subhas University of Technology",
      course: "B.Tech Information Technology",
      applicationId: "NSUT2025005678",
      status: "accepted",
      deadline: "2025-07-15",
      submittedDate: "2025-04-01",
      applicationFee: 800,
      nextStep: "Fee Payment",
      priority: "high",
      documentsRequired: 6,
      documents: [
        { name: "10th Certificate", submitted: true },
        { name: "12th Certificate", submitted: true },
        { name: "JEE Scorecard", submitted: true },
        { name: "Domicile Certificate", submitted: true }
      ],
      confirmationDeadline: "2025-08-15",
      lastUpdated: "2025-03-18T14:20:00Z",
      updateMessage: "Congratulations! You have been selected. Please confirm your admission by paying the fees."
    },
    {
      id: 3,
      collegeName: "Indira Gandhi Delhi Technical University",
      course: "B.Tech Electrical Engineering",
      applicationId: "IGDTU2025009876",
      status: "pending",
      deadline: "2025-07-01",
      submittedDate: "2025-03-10",
      applicationFee: 900,
      nextStep: "Document Verification",
      priority: "medium",
      documentsRequired: 7,
      documents: [
        { name: "10th Certificate", submitted: true },
        { name: "12th Certificate", submitted: true },
        { name: "Transfer Certificate", submitted: false },
        { name: "Character Certificate", submitted: false }
      ],
      lastUpdated: "2025-03-16T09:15:00Z",
      updateMessage: "Document verification in progress. Please submit pending documents."
    }
  ];

  const [filteredColleges, setFilteredColleges] = useState(mockColleges);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
        },
        (error) => {
          console.log('Location access denied, using default location');
        }
      );
    }
  }, []);

  useEffect(() => {
    // Filter colleges based on search and filters
    let filtered = mockColleges?.filter(college => {
      const matchesSearch = college?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           college?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           college?.courses?.some(course => course?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
      
      const matchesState = filters?.state === 'All States' || college?.location?.includes(filters?.state);
      const matchesCourse = !filters?.courseType || college?.courses?.some(course => 
        course?.toLowerCase()?.includes(filters?.courseType?.toLowerCase()));
      const matchesFees = college?.fees <= filters?.maxFees;
      const matchesQuota = !filters?.quota || college?.quota === filters?.quota;
      const matchesHostel = !filters?.hostel || college?.hostel;
      const matchesRating = college?.rating >= filters?.minRating;
      const matchesDistance = college?.distance <= filters?.maxDistance;
      const matchesPlacement = college?.placement >= filters?.placement;

      return matchesSearch && matchesState && matchesCourse && matchesFees && 
             matchesQuota && matchesHostel && matchesRating && matchesDistance && matchesPlacement;
    });

    // Sort by distance (nearest first)
    filtered?.sort((a, b) => a?.distance - b?.distance);
    
    setFilteredColleges(filtered);
  }, [searchQuery, filters]);

  const handleCompareCollege = (college) => {
    if (selectedColleges?.find(c => c?.id === college?.id)) {
      setSelectedColleges(selectedColleges?.filter(c => c?.id !== college?.id));
    } else if (selectedColleges?.length < 5) {
      setSelectedColleges([...selectedColleges, college]);
    }
  };

  const handleRemoveFromComparison = (collegeId) => {
    setSelectedColleges(selectedColleges?.filter(c => c?.id !== collegeId));
  };

  const handleViewDetails = (college) => {
    setSelectedCollege(college);
    setShowCollegeDetails(true);
  };

  const handleVirtualTour = (college) => {
    setSelectedCollege(college);
    setShowVirtualTour(true);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      state: 'All States',
      courseType: '',
      maxFees: 100000,
      quota: '',
      hostel: false,
      minRating: 0,
      maxDistance: 100,
      placement: 0
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-text-primary mb-4">
                College Intelligence Dashboard
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Discover the perfect college with our AI-powered platform. Compare institutions, track applications, 
                and make informed decisions with comprehensive data and virtual tours.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search colleges, courses, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-elevation-1"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-primary">{filteredColleges?.length}</div>
                <div className="text-sm text-text-secondary">Colleges Found</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-accent">{selectedColleges?.length}/5</div>
                <div className="text-sm text-text-secondary">In Comparison</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-secondary">₹{Math.min(...filteredColleges?.map(c => c?.fees))?.toLocaleString()}</div>
                <div className="text-sm text-text-secondary">Lowest Fees</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-professional">{Math.max(...filteredColleges?.map(c => c?.placement))}%</div>
                <div className="text-sm text-text-secondary">Best Placement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Action Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                iconName="Filter"
                iconPosition="left"
                onClick={() => setIsFilterOpen(true)}
              >
                Filters
              </Button>
              
              <div className="flex items-center space-x-2 bg-white rounded-lg border border-border p-1">
                <button
                  onClick={() => setActiveView('grid')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    activeView === 'grid' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="Grid3X3" size={18} />
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    activeView === 'list' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name="List" size={18} />
                </button>
              </div>

              <select
                className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                defaultValue="distance"
              >
                <option value="distance">Sort by Distance</option>
                <option value="fees">Sort by Fees</option>
                <option value="rating">Sort by Rating</option>
                <option value="placement">Sort by Placement</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              {selectedColleges?.length > 0 && (
                <Button
                  variant="outline"
                  iconName="GitCompare"
                  iconPosition="left"
                  onClick={() => setShowComparison(!showComparison)}
                >
                  Compare ({selectedColleges?.length})
                </Button>
              )}
              
              <Button
                variant="default"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => setShowTracker(!showTracker)}
                className="bg-secondary hover:bg-secondary/90"
              >
                Admission Tracker
              </Button>
            </div>
          </div>

          {/* Comparison Table */}
          {showComparison && selectedColleges?.length > 0 && (
            <div className="mb-8">
              <ComparisonTable
                colleges={selectedColleges}
                onRemoveCollege={handleRemoveFromComparison}
                onClose={() => setShowComparison(false)}
              />
            </div>
          )}

          {/* Admission Tracker */}
          {showTracker && (
            <div className="mb-8">
              <AdmissionTracker
                applications={mockApplications}
                onUpdateStatus={(id, status) => console.log('Update status:', id, status)}
                onAddDeadline={() => console.log('Add deadline')}
              />
            </div>
          )}

          {/* College Grid/List */}
          <div className={`${
            activeView === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-6'
          }`}>
            {filteredColleges?.map((college) => (
              <CollegeCard
                key={college?.id}
                college={college}
                onCompare={handleCompareCollege}
                isComparing={selectedColleges?.some(c => c?.id === college?.id)}
                onViewDetails={handleViewDetails}
                onVirtualTour={handleVirtualTour}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredColleges?.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">No colleges found</h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your search criteria or filters to find more colleges.
              </p>
              <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={() => {
                  setSearchQuery('');
                  handleClearFilters();
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredColleges?.length > 0 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                iconName="ChevronDown"
                iconPosition="right"
              >
                Load More Colleges
              </Button>
            </div>
          )}
        </div>

        {/* Quick Navigation */}
        <div className="bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
              Explore More Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Home', path: '/homepage-educational-technology-platform', icon: 'Home' },
                { name: 'Career Discovery', path: '/career-discovery-portal', icon: 'Compass' },
                { name: 'Personal Guidance', path: '/personal-guidance-center', icon: 'Users' },
                { name: 'Resources Hub', path: '/resource-timeline-hub', icon: 'BookOpen' },
                { name: 'Parent Portal', path: '/parent-educator-portal', icon: 'UserCheck' },
                { name: 'Success Stories', path: '#', icon: 'Trophy' }
              ]?.map((item, index) => (
                <Link
                  key={index}
                  to={item?.path}
                  className="flex flex-col items-center p-4 bg-white rounded-lg border border-border hover:shadow-elevation-2 transition-all duration-200 group"
                >
                  <Icon name={item?.icon} size={24} className="text-primary group-hover:scale-110 transition-transform duration-200 mb-2" />
                  <span className="text-sm font-medium text-text-primary text-center">{item?.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
      {/* Virtual Tour Modal */}
      <VirtualTourModal
        college={selectedCollege}
        isOpen={showVirtualTour}
        onClose={() => {
          setShowVirtualTour(false);
          setSelectedCollege(null);
        }}
      />
      {/* College Details Modal */}
      <CollegeDetailsModal
        college={selectedCollege}
        isOpen={showCollegeDetails}
        onClose={() => {
          setShowCollegeDetails(false);
          setSelectedCollege(null);
        }}
        onCompare={handleCompareCollege}
        onVirtualTour={handleVirtualTour}
      />
    </div>
  );
};

export default CollegeIntelligenceDashboard;
import { User, Staff, Product, Service, Lead, FollowUp, Customer, Review, Quotation, Attendance, StaffLocation, Banner, CompanyProfile } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', email: 'admin@energycare.demo', name: 'Admin User', role: 'admin' },
  { id: 'u2', email: 'staff@energycare.demo', name: 'Staff User', role: 'staff' },
];

export const mockCompanyProfile: CompanyProfile = {
  name: 'Energy Care',
  logo: '/logo.png',
  description: 'Solar solutions, energy-efficient products and professional services for homes and businesses across India.',
  address: '123 Energy Park, Tech Area, New Delhi, India 110001',
  phone: '+91 98765 43210',
  email: 'info@energycare.in',
  mission: 'To provide sustainable and affordable energy solutions.',
  vision: 'A greener tomorrow for everyone.',
  socialLinks: {
    facebook: 'https://facebook.com/energycare',
    twitter: 'https://twitter.com/energycare',
  }
};

export const mockStaff: Staff[] = [
  { id: 's1', staffId: 'EMP001', name: 'Rahul Sharma', phone: '9876543211', email: 'rahul@energycare.in', address: 'Delhi', designation: 'Sales Manager', department: 'Sales', joiningDate: '2023-01-15', status: 'Active', userId: 'u2' },
  { id: 's2', staffId: 'EMP002', name: 'Priya Singh', phone: '9876543212', email: 'priya@energycare.in', address: 'Gurgaon', designation: 'Field Executive', department: 'Operations', joiningDate: '2023-03-10', status: 'Active', userId: 'u3' },
];

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Solar Panel (550W)', category: 'Solar Panels', image: '/images/solar-panel.png', description: 'High efficiency solar panel for residential & commercial use.', specifications: ['550W', 'Monocrystalline', '25 years warranty'], features: ['Anti-reflective', 'High conversion'], price: 18999, status: 'Active' },
  { id: 'p2', name: 'Solar Inverter 5kW', category: 'Inverters', image: '/images/solar-inverter.png', description: 'Reliable & efficient inverter for uninterrupted power.', specifications: ['5kW', 'MPPT', '5 years warranty'], features: ['LCD display', 'Smart connectivity'], price: 25999, status: 'Active' },
  { id: 'p3', name: 'Lithium Battery 200Ah', category: 'Batteries', image: '/images/lithium-battery.png', description: 'Long-lasting energy storage for your needs.', specifications: ['200Ah', '12V', '10 years life'], features: ['Deep cycle', 'Maintenance free'], price: 48999, status: 'Active' },
  { id: 'p4', name: 'Solar Water Heater 200L', category: 'Water Heaters', image: '/images/solar-water-heater.png', description: 'Efficient and eco-friendly hot water solution.', specifications: ['200L', 'ETC tubes', '5 years warranty'], features: ['Fast heating', 'Heat retention'], price: 32999, status: 'Active' },
];

export const mockServices: Service[] = [
  { id: 'sv1', name: 'Solar Installation', image: '/images/SolarInstallation.png', description: 'End-to-end installation services for homes and businesses.', features: ['Site survey', 'Design', 'Installation', 'Commissioning'], startingPrice: 5000, status: 'Active' },
  { id: 'sv2', name: 'Maintenance & AMC', image: '/service-2.jpg', description: 'Keep your system running at peak performance.', features: ['Regular cleaning', 'Performance check', 'Repairs'], startingPrice: 2000, status: 'Active' },
  { id: 'sv3', name: 'Energy Audit', image: '/service-3.jpg', description: 'Optimize your energy consumption with expert audits.', features: ['Detailed analysis', 'Recommendations', 'ROI calculation'], startingPrice: 3000, status: 'Active' },
];

export const mockLeads: Lead[] = [
  { id: 'l1', customerName: 'Amit Patel', phone: '9876543221', email: 'amit@example.com', interestedProductOrService: 'Solar Panel (550W)', source: 'Website', requirement: 'Need 10 panels for home.', date: '2024-05-10', status: 'New' },
  { id: 'l2', customerName: 'Sunita Verma', phone: '9876543222', interestedProductOrService: 'Solar Installation', source: 'Reference', requirement: 'Complete setup for factory.', date: '2024-05-09', assignedStaffId: 's1', status: 'Follow-up' },
];

export const mockCustomers: Customer[] = [
  { id: 'c1', customerId: 'CUST001', name: 'Rajesh Kumar', phone: '9876543231', email: 'rajesh@example.com', address: 'Noida', purchasedItems: ['p1', 'p2'], salesDate: '2023-11-20', salesAmount: 150000, assignedStaffId: 's1', paymentStatus: 'Paid' },
];

export const mockQuotations: Quotation[] = [
  { id: 'q1', quotationId: 'EC-QT-1001', customerName: 'Vikram Singh', phone: '9876543241', email: 'vikram@example.com', address: 'Delhi', productOrService: 'Solar Installation', quantity: 1, requirement: '5kW system for residence.', preferredContactMethod: 'Phone', date: '2024-05-11', status: 'New' },
];

export const mockReviews: Review[] = [
  { id: 'r1', customerName: 'Neha Gupta', rating: 5, text: 'Excellent service and product quality. Highly recommended.', date: '2024-01-15', status: 'Active' },
  { id: 'r2', customerName: 'Sanjay Dutt', rating: 4, text: 'Good experience, installation was on time.', date: '2024-02-10', status: 'Active' },
];

export const mockBanners: Banner[] = [
  { id: 'b1', image: '/images/hero.png?v=2', title: 'Clean Energy for a Better Tomorrow', description: 'Sustainable, Reliable, Affordable.', order: 1, status: 'Active' },
];

export const mockAttendance: Attendance[] = [
  { id: 'a1', staffId: 's1', date: new Date().toISOString().split('T')[0], checkIn: '09:00 AM', status: 'Present' },
];

export const mockLocations: StaffLocation[] = [
  { id: 'sl1', staffId: 's1', latitude: 28.6139, longitude: 77.2090, timestamp: new Date().toISOString(), status: 'Active' },
];

export type Role = 'admin' | 'staff' | 'visitor';

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
};

export type StaffStatus = 'Active' | 'Inactive';

export type Staff = {
  id: string;
  staffId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  designation: string;
  department: string;
  joiningDate: string;
  profilePhoto?: string;
  status: StaffStatus;
  userId: string;
};

export type ProductStatus = 'Active' | 'Inactive';

export type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  specifications: string[];
  features: string[];
  price: number;
  status: ProductStatus;
};

export type ServiceStatus = 'Active' | 'Inactive';

export type Service = {
  id: string;
  name: string;
  image: string;
  description: string;
  features: string[];
  startingPrice: number;
  status: ServiceStatus;
};

export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Interested' | 'Quotation Sent' | 'Negotiation' | 'Converted' | 'Not Interested' | 'Lost';

export type Lead = {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  interestedProductOrService: string;
  source: string;
  requirement: string;
  budget?: string;
  date: string;
  assignedStaffId?: string;
  status: LeadStatus;
  remarks?: string;
};

export type FollowUpStatus = 'Pending' | 'Completed' | 'Cancelled';

export type FollowUp = {
  id: string;
  leadId: string;
  staffId: string;
  date: string;
  time: string;
  method: string;
  response: string;
  remarks?: string;
  nextFollowUpDate?: string;
  status: FollowUpStatus;
};

export type Customer = {
  id: string;
  customerId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  purchasedItems: string[];
  salesDate: string;
  salesAmount: number;
  assignedStaffId: string;
  installationDate?: string;
  warranty?: string;
  paymentStatus: 'Paid' | 'Partial' | 'Pending';
  remarks?: string;
};

export type ReviewStatus = 'Active' | 'Inactive';

export type Review = {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  photo?: string;
  date: string;
  status: ReviewStatus;
};

export type QuotationStatus = 'New' | 'Under Review' | 'Contacted' | 'Site Visit Required' | 'Quotation Prepared' | 'Sent' | 'Accepted' | 'Rejected' | 'Closed';

export type Quotation = {
  id: string;
  quotationId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  productOrService: string;
  quantity: number;
  requirement: string;
  preferredContactMethod: string;
  additionalMessage?: string;
  budget?: string;
  date: string;
  assignedStaffId?: string;
  status: QuotationStatus;
  notes?: string;
};

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Half Day' | 'Leave';

export type Attendance = {
  id: string;
  staffId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: AttendanceStatus;
};

export type LocationSharingStatus = 'Active' | 'Denied' | 'Unavailable' | 'Outdated';

export type StaffLocation = {
  id: string;
  staffId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  status: LocationSharingStatus;
};

export type BannerStatus = 'Active' | 'Inactive';

export type Banner = {
  id: string;
  image: string;
  title: string;
  description?: string;
  link?: string;
  status: BannerStatus;
  order: number;
};

export type CompanyProfile = {
  name: string;
  logo: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  mission: string;
  vision: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
};

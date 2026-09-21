import { Product, Service, Lead, Customer, Quotation, Review, Staff, Attendance, StaffLocation, Banner, CompanyProfile } from '../types';
import * as mockData from '../mock/data';

// --- Interfaces ---

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
}

export interface ServiceRepository {
  getAll(): Promise<Service[]>;
  getById(id: string): Promise<Service | null>;
}

export interface LeadRepository {
  getAll(): Promise<Lead[]>;
  create(data: Omit<Lead, 'id'>): Promise<Lead>;
  update(id: string, data: Partial<Lead>): Promise<Lead>;
}

export interface CustomerRepository {
  getAll(): Promise<Customer[]>;
  getById(id: string): Promise<Customer | null>;
}

export interface QuotationRepository {
  getAll(): Promise<Quotation[]>;
  create(data: Omit<Quotation, 'id' | 'quotationId' | 'status' | 'date'>): Promise<Quotation>;
  update(id: string, data: Partial<Quotation>): Promise<Quotation>;
}

// --- Mock Implementations ---
// In a real app, you would swap these out with Supabase implementations.

class MockProductRepository implements ProductRepository {
  async getAll() { return [...mockData.mockProducts]; }
  async getById(id: string) { return mockData.mockProducts.find(p => p.id === id) || null; }
}

class MockServiceRepository implements ServiceRepository {
  async getAll() { return [...mockData.mockServices]; }
  async getById(id: string) { return mockData.mockServices.find(s => s.id === id) || null; }
}

class MockLeadRepository implements LeadRepository {
  async getAll() { return [...mockData.mockLeads]; }
  async create(data: Omit<Lead, 'id'>) {
    const newLead = { ...data, id: `l${Date.now()}` } as Lead;
    mockData.mockLeads.push(newLead);
    return newLead;
  }
  async update(id: string, data: Partial<Lead>) {
    const index = mockData.mockLeads.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Not found');
    mockData.mockLeads[index] = { ...mockData.mockLeads[index], ...data };
    return mockData.mockLeads[index];
  }
}

class MockCustomerRepository implements CustomerRepository {
  async getAll() { return [...mockData.mockCustomers]; }
  async getById(id: string) { return mockData.mockCustomers.find(c => c.id === id) || null; }
}

class MockQuotationRepository implements QuotationRepository {
  async getAll() { return [...mockData.mockQuotations]; }
  async create(data: Omit<Quotation, 'id' | 'quotationId' | 'status' | 'date'>) {
    const newQuote: Quotation = {
      ...data,
      id: `q${Date.now()}`,
      quotationId: `EC-QT-${1000 + mockData.mockQuotations.length + 1}`,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    };
    mockData.mockQuotations.push(newQuote);
    return newQuote;
  }
  async update(id: string, data: Partial<Quotation>) {
    const index = mockData.mockQuotations.findIndex(q => q.id === id);
    if (index === -1) throw new Error('Not found');
    mockData.mockQuotations[index] = { ...mockData.mockQuotations[index], ...data };
    return mockData.mockQuotations[index];
  }
}

class MockCompanyRepository {
  async get() { return { ...mockData.mockCompanyProfile }; }
}

class MockStaffRepository {
  async getAll() { return [...mockData.mockStaff]; }
}

class MockReviewRepository {
  async getAll() { return [...mockData.mockReviews]; }
}

class MockBannerRepository {
  async getAll() { return [...mockData.mockBanners]; }
}

class MockAttendanceRepository {
  async getAll() { return [...mockData.mockAttendance]; }
}

// Export singletons for use in the app
export const productRepo = new MockProductRepository();
export const serviceRepo = new MockServiceRepository();
export const leadRepo = new MockLeadRepository();
export const customerRepo = new MockCustomerRepository();
export const quotationRepo = new MockQuotationRepository();
export const companyRepo = new MockCompanyRepository();
export const staffRepo = new MockStaffRepository();
export const reviewRepo = new MockReviewRepository();
export const bannerRepo = new MockBannerRepository();
export const attendanceRepo = new MockAttendanceRepository();

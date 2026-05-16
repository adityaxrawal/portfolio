export interface Company {
  name: string;
  careerLink: string;
  employees: number;
}

export interface HRContact {
  hr_name: string;
  hr_email: string;
}

export interface CompanyHR {
  company: string;
  company_career_link: string;
  hr_list: HRContact[];
}

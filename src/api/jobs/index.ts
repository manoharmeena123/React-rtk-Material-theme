import type { Company } from 'src/types/job';
import { deepCopy } from 'src/utils/deep-copy';
import { companies, company } from './data';

type GetCompaniesRequest = {};

type GetCompaniesResponse = Promise<Company[]>;

type GetCompanyRequest = {};

type GetCompanyResponse = Promise<Company>;

class JobsApi {
  getCompanies(request?: GetCompaniesRequest): GetCompaniesResponse {
    return Promise.resolve(deepCopy(companies));
  }

  getCompany(request?: GetCompanyRequest): GetCompanyResponse {
    return Promise.resolve(deepCopy(company));
  }
}

export const jobsApi = new JobsApi();

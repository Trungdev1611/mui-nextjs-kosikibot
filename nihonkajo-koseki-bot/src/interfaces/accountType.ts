export interface AccountData {
  authority: string;
  loginId: string;
  password: string;
  password_confirm: string;
  organization: string;
  name: string;
  departmentName: string | null;
  email: string | null;
  desc: string | null;
}

export interface ContentData {
  bookTitle: string;
  file: File;
  fileUrl: string;
  referenceDate: string;
  publicationDate: string | null;
  status: boolean;
  category: string;
  category1: string;
  [key: string]: boolean | File | null | string;
}

export interface CustomDataType {
  operatingcompany?: string;
  file: File;
  term?: string;
  policy: string;
  contactUrl: string;
}

export interface CustomDataSupportType {
  desc: string;
}

export interface InforDataType {
  title: string,
  category: string
  desc: string
  createdAt: string
  updatedAt?: string
  status?: boolean
}
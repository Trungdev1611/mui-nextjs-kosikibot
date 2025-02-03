import * as yup from 'yup';

export const groupSchema = yup.object().shape({
  vendor: yup.string().nullable(),
  group_name: yup.string().required('Group Name is required'),
  prefecture: yup.string().required('Prefecture is required'),
  address: yup.string(),
  person_name: yup.string(),
  phone: yup
    .string()
    .nullable()
    .matches(/^\d*$/, 'Phone must be a valid number'),
  email: yup.string().email('Email must be a valid email address'),
  memo: yup.string().nullable(),
});


export const AccountSchema = yup.object().shape({
  authority: yup.string().required(`Authority is required`),
  loginId: yup.string().required(`loginId is required`),
  password: yup
  .string()
  .required('Password is required')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
    'Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long'
  ),
  password_confirm: yup
  .string()
  .required('Password confirmation is required')
  .oneOf([yup.ref('password')], 'Passwords confirm must match password above'),
  organization: yup.string().required(`organization is required`),
  name: yup.string().required(`name is required`),
  email: yup.string().email('Email must be a valid email address').nullable(),
  departmentName: yup.string().nullable(),
  desc: yup.string().nullable()
})

export const ContentScheme = yup.object().shape({
  bookTitle: yup.string().required(`BookTitle is required`),
  file: yup.mixed().required(`file is required`),
  fileUrl: yup.string().required(`fileUrl is required`),
  referenceDate:yup.string().required(`Date is required`),
  characters: yup.string().required(`Date is required`),
  category1: yup.string().required(`根拠の区切り方 is required`),
  
})

export const CustomScheme = yup.object().shape({
  file: yup.mixed().required(`File is required`),
})

export const CustomSchemeSupport = yup.object().shape({
  desc: yup.string().required(`サポート情報 is required`),
})



export const InforScheme = yup.object().shape({
  title: yup.string().required(`BookTitle is required`),
  category: yup.string().required(`BookTitle is required`),
  desc: yup.string().required(`お知らせ is required`),
  createdAt:  yup.string().required(`release date is required`),
})

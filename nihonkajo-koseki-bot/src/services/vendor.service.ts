import { itemList } from '@/lib/HB/function/itemList';

const DATASTORE_ID = process.env.NEXT_PUBLIC_M_VENDOR || '';

export const getVendors = async (body: any) => {
  try {
    const response = await itemList(DATASTORE_ID, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

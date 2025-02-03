import { GroupData } from '@/interfaces/group.interface';
import { createItem } from '@/lib/HB/function/createItem';
import { getDatastoreFields } from '@/lib/HB/function/getDatastoreFields';
import { itemList } from '@/lib/HB/function/itemList';
import { updateItem } from '@/lib/HB/function/updateItem';
import { typeRoute } from '@/utils/auth';
import { getCookie } from 'cookies-next';

const DATASTORE_ID = process.env.NEXT_PUBLIC_T_GROUP || '';

export const getFieldsGroup = async () => {
  try {
    const response = await getDatastoreFields(DATASTORE_ID);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

export const getListGroup = async (body: any) => {
  try {
    const type = typeRoute();
    const vendor: any = getCookie(`vendor_${type}`);
    const dataVendor = JSON.parse(vendor);

    if (!dataVendor?.i_id) {
      throw new Error('Vendor ID is missing');
    }

    const payload = {
      ...body,
      conditions: [
        ...(body.conditions || []),
        {
          id: 'vendor',
          search_value: [dataVendor?.i_id],
        },
      ],
    };

    const response = await itemList(DATASTORE_ID, payload);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

export const createGroup = async (body: { item: GroupData }) => {
  try {
    const response = await createItem(DATASTORE_ID, body);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

export const updateGroup = async (
  groupId: string,
  body: { item: GroupData },
) => {
  try {
    const response = await updateItem(DATASTORE_ID, groupId, {
      ...body,
      is_force_update: true,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

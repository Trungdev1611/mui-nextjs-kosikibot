import TestAPIService, { paramDefault } from '@/services/test.service';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

/**

1. login hexabase https://api.hexabase.com/api/v0/login 
{
  "email": "trungdev1611@gmail.com",
  "password": "phamvantrung94"
}

2. get workspaces infor exist 
with bearer token https://api.hexabase.com/api/v0/workspaces sẽ return workspaceId, ta có thể sử dụng nó cho API khác

3. Từ workspaceId bên trên ta có thể get applicationId và datastoreId
Get    https://api.hexabase.com/api/v0/workspaces/:workspace-id/applications (nhớ kèm bearer)

Example response: 
[
    {
        "application_id": "6787264bcd85fc25432a10ae",
        "name": "新しいアプリケーション",
        "display_id": "APP-u95M1xv6",
        "datastores": [
            {
                "datastore_id": "67872929711a54ba18696707",
                "name": "TODO Database",
                "display_id": "Db-fnXdbBOS"
            }
        ]
    }
]
với thông tin cần thiết bên trên để lấy thông tin getList hoặc tương tự
4. IMPORTANT -GET LIST data có trả ra totalPages, method là post
https://apidoc.hexabase.com/en/docs/v0/items-search/ItemList
Example:POST::: https://api.hexabase.com/api/v0/applications/6787264bcd85fc25432a10ae/datastores/67872929711a54ba18696707/items/search
//payload
{
    "use_or_condition": false,
    "page": 1,        // số current page
    "per_page": 2,   //số phần tử trên 1 page (ở đây là 2)
    "use_display_id": true,
    "return_number_value": true
}

//response sample 
{
    "items": [
        {
            "Assignee": "Y",
            "Category": "A",
            "DueDate": "2016-01-01T00:00:00Z",
            "Status": "Assigned",
            "Title": "TaskB",
            "created_at": "2025-01-15T03:19:11Z",
            "created_by": "IMPORT",
            "d_id": "67872929711a54ba18696707",
            "i_id": "6787292f711a54ba1869672b",
            "p_id": "6787264bcd85fc25432a10ae",
            "rev_no": 1,
            "status_id": "678729295e990b693e9387ca",
            "title": "TaskB",
            "unread": 0
        },
        {
            "Assignee": "trung pham van",
            "Category": "A",
            "DueDate": "2025-01-18T11:16:43Z",
            "Status": "New",
            "Title": "trung test",
            "a_id": "6787292a5e990b693e9387f5",
            "created_at": "2025-01-15T04:17:16Z",
            "created_by": "6787260a5e4c48f488497c97",
            "d_id": "67872929711a54ba18696707",
            "i_id": "678736ab16054f3400ffa50c",
            "p_id": "6787264bcd85fc25432a10ae",
            "rev_no": 1,
            "status_id": "678729295e990b693e9387c9",
            "title": "trung test",
            "unread": 0
        }
    ],
    "totalItems": 6
}

conditions          : Specify search condition
use_or_condition    : Searches with OR conditions (if false or not specified, AND conditions will be applied).
per_page            : A Number of search results (If omitted or 0 is specified, all results are retrieved).
page                : Number of pages
unread_only         : If true is specified, a narrowing condition of only 「Items with unread history」 will be added to the conditions.
sort_field_id       : Assign sort field ID (If the sort key is only 1 field).
sort_order          : "asc" for ascending order "desc" for descending order (when the sort key is only 1 field).
sort_fields         : Specified when there are multiple sort keys. It is used for sorting in preference to sort_field_id. [{id: "FIELD_A", order: "asc"},{id: "FIELD_B", order: "desc"}]
                      Specify the field display ID in "id" and the sort order in "order". If omitted, the order will be ascending.
                      The order specified in the array is applied in the form of the first sort key, and second sort key.
use_default_search  : true or false Specify true to apply the default search condition.
include_links       : If true, you will get an array of IDs of related items.
include_lookups     : If true is specified, the reference item information of the database reference type will be included in the result.
return_count_only   : If true is specified, only totalItems will be returned. items[] (empty array) will become empty.
include_fields_data : If you specify true, it will return including the information of fields.
omit_total_items    : If true, totalItems is not counted (faster) totalItems is zero.
data_result_timeout_sec    : Specifies the number of seconds to time out before the result of the view is retrieved. If timeout occurs, items will be [] (empty array).
total_count_timeout_sec    : Specifies the number of timeout seconds before the number of cases is retrieved. If timeout occurs, -1 is returned.
return_number_value : If true, numeric type data is output as Number (by default, numbers are returned as string ("123")).
select_fields       : Narrow down and specify field items to be returned in the response items (at a faster pace).
select_fields_lookup: Narrow down and specify the field items returned in the response lookup_items by data store (at a faster pace).
format              : If "csv" is specified, the output is in CSV format.





*/

//endpoint: localhost://3001/api/testcomponent
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const responseHexabase = await TestAPIService.getListSettingServer(
      {
        appId: `6787264bcd85fc25432a10ae`, // SYSTEM_DATA.appId
        dataStoreId: `67872929711a54ba18696707`,
      },
      { page: 3, per_page: 2 },
    );
    console.log('chạy qua đây', responseHexabase);
    return Response.json(responseHexabase);
  } catch (error) {
    console.log('error data', error);
    return Response.json(error);
  }
}

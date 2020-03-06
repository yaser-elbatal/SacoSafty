import gql from 'graphql-tag';

export const List_Items = gql`
  query ListItems($category_id: Int!) {
    monthely_report_item_config(where: {category_id: {_eq: $category_id}},order_by: {id: desc}) {
        created_at
        images_number
        isNeglected
        name
        name_ar
        id
    }
  }
`;

export const Update_Item = gql`
mutation updateItem($id: Int!, $images_number: Int!, $name: String!, $name_ar: String!,$isNeglected:Boolean!) {
    update_monthely_report_item_config(where: {id: {_eq: $id}}, _set: {name: $name,images_number: $images_number, name_ar: $name_ar, isNeglected: $isNeglected}) {
    affected_rows
  }
 }
`;

export const Create_Item = gql`
mutation addItem($category_id: Int!, $images_number: Int!, $name: String, $name_ar: String) {
  insert_monthely_report_item_config(objects: {category_id: $category_id,images_number: $images_number, name: $name, name_ar: $name_ar}) {
    affected_rows
  }
 }
`;
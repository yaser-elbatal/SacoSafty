import gql from 'graphql-tag';



export const List_Cats = gql` 
query ListCats {
    monthely_report_categories(order_by: {created_at: desc}) {
      id
      created_at
      isNeglected
      name
      name_ar
      items: category_items_aggregate {
        aggregate {
          count(columns: id, distinct: true)
        }
      }
    }
  }
  `;


export const Update_Cat = gql`
mutation UpdateCat($id: Int!, $name: String, $name_ar: String,$isNeglected:Boolean!) {
    update_monthely_report_categories(where: {id: {_eq: $id}}, _set: {name: $name, name_ar: $name_ar, isNeglected: $isNeglected}) {
    affected_rows
  }
 }
`;


export const Create_Cat = gql`
mutation AddCat($name: String, $name_ar: String) {
  insert_monthely_report_categories(objects: {name: $name, name_ar: $name_ar}) {
    affected_rows
  }
 }
`;
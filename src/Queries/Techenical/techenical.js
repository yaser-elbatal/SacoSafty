import gql from 'graphql-tag'

export const TechnicalSubs = gql`
subscription Tech {
  technical_department {
    id
    name
    name_ar
    created_at
    updated_at
    technical_department_user {
      department_user_user {
       
        id
      }
    }
  }
}
  
`
export const techEmployee = gql`
subscription Tech($depId: Int!) {
    technical_department(where: {id: {_eq: $depId}}) {
      id
      technical_department_user {
        department_user_user {
          active
          avatar
          created_at
          display_name
          id
          user_type
        }
        id
      }
    }
  }
  
`
export const AddTchnicalDepartment = gql`
  mutation addTechnicalDepartment ($name:String,$name_ar:String!) {
    insert_technical_department(objects: {name_ar: $name_ar, name: $name}) {
      affected_rows
    }
  }
`

export const AllUser = gql`
subscription getDepartmentUsers ($dep_user_ids:[uuid!]){
  user(where: {user_type: {_eq: tech_user}, _and: {id: {_nin: $dep_user_ids}}}) {
    id
    avatar
    username
    user_type
    display_name
    active
  }
}
`

export const AddEmployee = gql`
mutation MyMutation($dep_id: Int!, $userIds: [uuid!]) {
  __typename
  update_department_user(where: {user_id: {_in: $userIds}}, _set: {department_id: $dep_id}) {
    affected_rows
  }
}
`
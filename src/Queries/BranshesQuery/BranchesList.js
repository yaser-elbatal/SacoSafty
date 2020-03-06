import gql from "graphql-tag";

const Get_list = gql`
  subscription Get_list {
    branch(order_by: { id: asc }) {
      branch_manager
      branch_number
      id
      name
      name_ar
      avatar
      about
      branch_manager_emp {
        employee_user {
          display_name
        }
      }
    }
  }
`;
export default Get_list;

export const AddBranch = gql`
mutation addBranch ($about:String!,$avatar:String!,$branchnumber:String!,$name:String!,$name_ar:String!,$contact_numbers:String!,$neighborhood:Int!) {
  insert_branch(objects: {about: $about, avatar: $avatar, branch_number: $branchnumber, name: $name, name_ar: $name_ar, contact_numbers: $contact_numbers,  neighborhood: $neighborhood}) {
    returning{
      id
    }
  }
}
`
export const MaintainComp = gql`
query MyQuery {
  maintainance_company {
    company_name
    id
    isNeglected
  }
}
`

export const EditCompBranch = gql`
mutation MyMutation ($companyId: Int!,$BranchId: Int!){
  __typename
  insert_company_maintain_branches(objects: {branch_id: $companyId, company_id: $BranchId}) {
    affected_rows
  }
}
`

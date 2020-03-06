import gql from "graphql-tag";

const Edit_Branch = gql`
  mutation updateBranch(
    $branch_id: Int!
    $name: String!
    $name_ar: String!
    $neighborhood: Int!
    $branch_number: String!
    $about: String!
    $contact_numbers: String!
  ) {
    update_branch(
      where: { id: { _eq: $branch_id } }
      _set: {
        name: $name
        name_ar: $name_ar
        neighborhood: $neighborhood
        contact_numbers: $contact_numbers
        branch_number: $branch_number
        about: $about
      }
    ) {
      affected_rows
    }
  }
`;
export default Edit_Branch;

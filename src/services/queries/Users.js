import gql from 'graphql-tag';


export const List_Company_Users = gql`
subscription ListCompanyUsers {
  company_users(order_by: {company_users_company: {id: desc}}) {
    company_users_user {
      active
      avatar
      created_at
      display_name
      id
      username
      user_type
    }
    company_users_company {
      company_name
      id
    }
  }
}
    `;

export const List_Department_Users = gql`
subscription ListDepartmentUsers {
  department_user(order_by: {department_user_department: {id: desc}}) {
    department_user_user {
      active
      avatar
      created_at
      display_name
      id
      user_type
      username
    }
    department_user_department {
      name_ar
      id
    }
  }
}

  `;

export const List_Dropdowns = gql`
query ListDropdowns {
  user_type {
    value
  }
  branch {
    id
    value: name_ar
  }
  maintainance_company {
    id
    value: company_name
  }
  technical_department {
    id
    value: name_ar
  }
}

`;

export const List_Admins = gql`
subscription ListAdmins {
  user(where: {user_type: {_eq: admin}}, order_by: {created_at: desc}) {
    active
    avatar
    created_at
    display_name
    id
    user_type
    username
  }
}
`;

export const List_Engineers = gql`
subscription ListEngineers {
  user(where: {user_type: {_eq: engineer}}, order_by: {created_at: desc}) {
    active
    avatar
    created_at
    display_name
    id
    user_type
    username
  }
}
`;

export const List_Branches_Users = gql`
subscription ListBranchesUsers {
  employee(order_by: {emp_branch: {id: desc}}) {
    employee_user {
      active
      avatar
      created_at
      display_name
      id
      user_type
      username
    }
    emp_branch {
      name_ar
      id
    }
    email
    employee_number
  }
}
`;


export const Add_Member_To_Company = gql`
mutation AddMemberToCompany($company_id: Int!, $user_id: uuid!) {
  insert_company_users(objects: {company_id: $company_id, user_id: $user_id
  }) { affected_rows }
}
`;

export const Add_Member_To_Department = gql`
mutation AddMemberToDepartment($department_id: Int!, $user_id: uuid!) {
  insert_department_user(objects: {department_id: $department_id, user_id: $user_id
  }) { affected_rows }
}
`;

export const Add_Member_To_Branch = gql`
mutation AddMemberToBranch($user_id: uuid!, $branch_id: Int!, $email: String!, $employee_number: String!,) {
  insert_employee(objects: {
    user_id: $user_id, branch_id: $branch_id, email: $email, employee_number: $employee_number
  }) { affected_rows }
}
`;

export const Update_User = gql`
mutation UpdateUser ($id: uuid!, $username: String!, $active: Boolean!, $display_name:String!,) {
    update_user(
      where: {id: {_eq: $id}}, _set: {username: $username, active: $active, display_name: $display_name}) {
    affected_rows
  }
 }
`;

export const Update_Member_In_Company = gql`
mutation UpdateMemberToCompany($company_id: Int!, $id: uuid!) {
  update_company_users(where: {
    user_id: {_eq: $id}} _set:{ company_id: $company_id
  }) { affected_rows }
}
`;

export const Update_Member_In_Department = gql`
mutation UpdateMemberToDepartment($department_id: Int!, $id: uuid!) {
  update_department_user(where: {
    user_id: {_eq: $id}} _set:{ department_id: $department_id
  }) { affected_rows }
}
`;

export const Update_Member_In_Branch = gql`
mutation UpdateMemberToBranch($id: uuid!, $branch_id: Int!, $email: String!, $employee_number: String!,) {
  update_employee(where: {
    user_id: {_eq: $id}} _set:{ branch_id: $branch_id, email: $email, employee_number: $employee_number}) { affected_rows }
}
`;
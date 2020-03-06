import gql from 'graphql-tag';



export const List_Branches_Companies = gql`
query ListBranchesCompanies {
  branch {
    name_ar
    name
    id
  }
  maintainance_company {
    company_name
    id
  }
}
`;


export const List_Reports = gql`
query ListReports ($filterBranch: maintainance_report_bool_exp!, $limit: Int!){
  maintainance_report (order_by: {id: desc}, where: $filterBranch, limit: $limit) {
    maintainance_report_branch {
      id
      name_ar
    }
    maintainance_report_company {
      company_name
    }
    id
    created_at
    maintainance_date
    status
    updated_at
    visit_type
    system_type
  }
}
`;


export const List_Items_Cats = gql`
query ListItemsCats ($ids: [Int!]) {
  maintainance_items(where: {id: {_in: $ids}}) {
    name_ar
    isNeglected
    id
    created_at
    maintainance_items_category {
      id
      isNeglected
      name_ar
    }
  }
}
`;

export const List_Report_Details_Report = gql`
query ListReportDetailsReport($report_id: Int!) {
  report: maintainance_report(where: {id: {_eq: $report_id}}) {
    visit_type
    updated_at
    system_type
    problem_solution
    problem_description
    maintainance_date
    images
    status
    created_at
    branch: maintainance_report_branch {
      name_ar
      id
    }
    company: maintainance_report_company {
      id
      company_name
    }
  }
}
`;

export const List_Report_Details = gql`
query ListReportDetails($report_id: Int!) {
  maintainance_report(where: {id: {_eq: $report_id}}) {
    visit_type
    updated_at
    system_type
    problem_solution
    problem_description
    maintainance_date
    images
    status
    created_at
    maintainance_report_branch {
      name_ar
      id
    }
    maintainance_report_company {
      id
      company_name
    }
    maintainance_report_items {
      amount
      id
      item_id
    }
  }
}
`;


export const List_Report_Comments = gql`
subscription ListReportComments ($reportId:Int!){
  maintainance_report_comments(where: {maintainance_report: {_eq: $reportId}}) {
    comment
    created_at
    created_by
    id
    images
    updated_at
    maintainance_comment_user {
      active
      avatar
      id
      display_name
    }
  }
}
`;


export const Create_Comment = gql`
mutation CreateComment($images: String!, $comment: String!, $created_by: uuid!, $maintainance_report: Int!) {
  insert_maintainance_report_comments(objects: {images: $images ,comment: $comment,
    created_by: $created_by,maintainance_report: $maintainance_report }) {
    affected_rows
  }
 }
`;


export const List_Reports_Statistics_1 = gql`
query ListReportsStatistics1 {
  reports: maintainance_report {
    date: maintainance_date
    status
    branch: maintainance_report_branch {
      id
      name: name_ar
    }
    company: maintainance_report_company {
      id
      name: company_name
    }
    items: maintainance_report_items_aggregate {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
}
`;
import gql from 'graphql-tag'

export const EmergencyDepartment = gql`
  query EmergencyDep {
    emergency_department(distinct_on: department_id) {
      department_id
      emergency_id
      id
      emergency_department_technical_department {
        name
        name_ar
        id
        
      }
    }
  }

`
export const EmergenctReportDetailes = gql`
query MyQuery($filter: emergency_report_bool_exp!) {
    emergency_report(where: $filter, order_by: {id: asc}) {
      id
      updated_at
      created_at
      description
      assets
      emergency_report_branch {
        name_ar
        name
        branch_neighborhood {
          name
          name_en
        }
      }
      emergency_report_department {
        emergency_department_technical_department {
          name
          name_ar
        }
      }
      emergency_report_user {
        active
        avatar
        created_at
        display_name
        id
        user_type
        username
      }
    }
  }
  
`

export const EmergancyCount = gql`
subscription GetEmCo {
  emergency_report_aggregate {
    aggregate {
      count(columns: created_at, distinct: true)
    }
  }
}
`
export const EmergancyBranchStatis = gql`
subscription GetBranch {
  emergency_report_aggregate {
    aggregate {
      count(columns: id)
    }
    nodes {
      emergency_report_branch {
        name_ar
        id
      }
    }
  }
}

`
export const EmerganctDepStat = gql`
subscription GetReb($filter: emergency_department_bool_exp!) {
  emergency_department(where: $filter) {
    emergency_department_technical_department {
      name_ar
      id
    }
    emergency_department_reports {
      emergency_report_branch {
        id
        name_ar
      }
    }
  }
}

`
export const GetDepBra = gql`
query MyQuery {
  branch {
    id
    name_ar
  }
  technical_department {
    id
    name_ar
  }
}
`
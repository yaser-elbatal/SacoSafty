import gql from "graphql-tag";

export const Get_detailes = gql`
query getRiskAssessment($reportId: Int!) {
  risk_assessment_by_pk(id: $reportId) {
    risk_assessment_branch {
      avatar
      name_ar
      name
    }
    created_at
  }
  risk_assessment_category {
    category_items {
      title
      title_ar
      item_details(where: {report_id: {_eq: $reportId}}) {
        created_at
        image
        status
        comment
        detail_correction_action {
          comment
          created_at
          image
          id
          detail_id
          created_by
        }
        id
      }
    }
    name
    name_ar
    precentage
    id
    created_at
    updated_at
  }
}

`;

export const Get_Comments = gql`
  subscription MyQuery($report_id: Int!) {
    risk_assessment_report_comments(
      where: { risk_assessment_report: { _eq: $report_id } }
    ) {
      comment
      created_at
      images
      id
      updated_at
      risk_assessment_report
      risk_assessment_report_comments_user {
        active
        avatar
        id
        created_at
        username
      }
    }
  }
`;
export const insert_comment = gql`
  mutation CreateComment(
    $images: String!
    $comment: String!
    $created_by: uuid!
    $risk_report: Int!
  ) {
    insert_risk_assessment_report_comments(
      objects: {
        images: $images
        comment: $comment
        created_by: $created_by
        risk_assessment_report: $risk_report
      }
    ) {
      affected_rows
    }
  }
`;
export const Get_categories = gql`
  subscription MyQuery {
    risk_assessment_category(order_by: { id: asc }) {
      id
      name
      name_ar
      precentage
      updated_at
      created_at
      isNeglected
      category_items {
        normal_state
        title
        title_ar
        updated_at
      }
    }
  }
`;
export const Edit_Categories = gql`
mutation updateCategory($category_id: Int!, $name: String!, $name_ar: String!, $isNeglected: Boolean!, $precentage: float8!) {
  update_risk_assessment_category(where: {id: {_eq: $category_id}}, _set: {name: $name, name_ar: $name_ar, isNeglected: $isNeglected, precentage: $precentage}) {
    affected_rows
  }
}

`;
export const List_Items = gql`
  subscription List($category_id: Int!) {
    risk_assessment_category_items(
      where: { category_id: { _eq: $category_id } }
      order_by: { id: asc }
    ) {
      id
      isNeglected
      normal_state
      title
      title_ar
      updated_at
      created_at
      percentage
    }
  }
`;
export const Edit_items = gql`
mutation updateItem($item_id: Int!, $title: String!, $title_ar: String!, $normal_state: String!, $isNeglected: Boolean!,$percentage:float8) {
  update_risk_assessment_category_items(where: {id: {_eq: $item_id}}, _set: {title: $title, title_ar: $title_ar, normal_state: $normal_state, isNeglected: $isNeglected, percentage: $percentage}) {
    affected_rows
  }
}

`;

export const Insert_Categories = gql`
mutation insertCategory($name: String!, $name_ar: String!,$precentage:float8) {
  insert_risk_assessment_category(objects: {name: $name, name_ar: $name_ar, precentage: $precentage}) {
    affected_rows
  }
}

`;
export const Insert_Items = gql`
mutation insertCategory($category_id: Int!, $title: String!, $title_ar: String!, $normal_state: String!,$percentage:float8) {
  insert_risk_assessment_category_items(objects: {title: $title, title_ar: $title_ar, normal_state: $normal_state, category_id: $category_id, percentage:$percentage}) {
    affected_rows
  }
}

`;

export const Edit_Correct = gql`
mutation addCorrectionAction ($comment:String!,$created_by:uuid!,$detail_id:Int!,$image:String!) {
  insert_risk_assessment_detail_correction_action(objects: {comment: $comment, created_by: $created_by, detail_id: $detail_id, image: $image}) {
    affected_rows
  }
}
`
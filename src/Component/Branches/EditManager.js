import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Edit_Manager from "../../Queries/BranshesQuery/EditManager";
import Get_employees from "../../Queries/BranshesQuery/BranchesEmployee";
import PopUp from "./PopUp";
import EditManagerForm from "./EditManagerForm";

export class EditManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      updateData: {}
    };
  }
  clearData = () => {
    this.setState({ updateData: {} });
  };

  updatenewdata = newData => {

    this.setState({ updateData: { id: newData } });
  };

  updateHandle = updateManager => {

    this.setState({ updateData: {} });
    updateManager();
  };

  render() {
    return (
      <Mutation
        mutation={Edit_Manager}
        variables={{
          branch_id: this.props.branch_id,
          employee_id:
            this.state.updateData.id ||
            this.props.manager.emp_branch.branch_manager
        }}
      >
        {(updateManager, { data }) => (
          <React.Fragment>
            <PopUp
              {...{
                buttonLabel: "تعديل",
                buttonColor: "success",
                body: (
                  <EditManagerForm
                    data={this.state.data}
                    clearData={this.clearData}
                    updateData={this.updatenewdata}
                  />
                ),
                submitLabel: "اضافه",
                cancelLabel: "تراجع",
                onSubmit: () => this.updateHandle(updateManager)
              }}
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}

export default EditManager;

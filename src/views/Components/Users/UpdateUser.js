import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {
  Update_User, Update_Member_In_Branch, Update_Member_In_Company, Update_Member_In_Department
} from "../../../services/queries/Users";
import _ from "lodash";
import axios from "axios"
import PopUp from "../Custom/PopUp/PopUp";
import UpdateMemberForm from "./UpdateUserForm";
import { store as notificationStore } from 'react-notifications-component';

export default class UpdateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mutation: Update_Member_In_Branch,
      updatedData: _.pick(this.props.user, [
        "id", "username", "active", "display_name", "email", "employee_number"
      ]),
    };
  }

  componentDidMount() {
    let { user, position, dropdownData, type } = this.props
    let { updatedData } = this.state

    let mutation = Update_Member_In_Branch;
    switch (type) {
      case "branches": mutation = Update_Member_In_Branch; break;
      case "maintainance": mutation = Update_Member_In_Company; break;
      case "departments": mutation = Update_Member_In_Department; break;
    }

    this.setState({
      mutation,
      user, position, dropdownData,
      ...(dropdownData && { updatedData: { ...updatedData, [dropdownData.fieldName]: parseInt(position.id) } })
    })
  }

  clearData = () => this.setState({ updatedData: {} });

  updateData = newData => {
    let updatedData = this.state.updatedData;
    this.setState({
      updatedData: { ...updatedData, ...newData }
    });
  };


  checkUserAPI = async (username, password) => {
    return await axios({
      method: "POST",
      data: { username, password },
      url: `http://68.183.13.171:3000/checkUser`,
      headers: { "content-type": `application/json` },
    });
  };

  updatePasswordAPI = async userData => {
    return await axios({
      method: "POST",
      data: userData,
      url: `http://68.183.13.171:3000/changePassword`,
      headers: { "content-type": `application/json` }
    });
  };

  updateHandle = async (updateUser, updateUserAdditionalInfo) => {
    let { updatedData } = this.state
    let { user, position, dropdownData, type } = this.props

    let adminUsername = (localStorage.getItem("sacoAdmin")) ? JSON.parse(localStorage.getItem("sacoAdmin")).username : ""

    let checkUserAPI = await this.checkUserAPI(adminUsername, updatedData.myPassword || "*******");

    if (checkUserAPI.status == 200) {

      if (updatedData.password) {
        // return console.log({in : updatedData})
        if (updatedData.password == updatedData.confirmPassword)
          await this.updatePasswordAPI(
            _.pick(updatedData, ['username', 'password', 'confirmPassword',])
          );
        else return
      }

      if (user.username != updatedData.username || user.display_name != updatedData.display_name)
        updateUser({
          variables: {
            ..._.pick(updatedData, ["id", "username", "active", "display_name"])
          },
        })


      if (
        !["admin", "engineer"].includes(type) &&
        (
          user.email != updatedData.email ||
          user.employee_number != updatedData.employee_number ||
          user[dropdownData.fieldName] != updatedData[dropdownData.fieldName]
        )
      )
        updateUserAdditionalInfo({
          variables: {
            ..._.omit(updatedData, ["username", "active", "display_name", "myPassword"])
          }
        })

    }
    else {
      notificationStore.addNotification({
        // title: "Wonderful!",
        message: "تأكد فى كلمة المرور الخاصة بك",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          // onScreen: true
        },
      })
    }

    this.setState({ updatedData: _.omit(updatedData, ["myPassword"]) })
  };

  deleteHandle = updateUser => {
    let { dropdownData } = this.props
    let updatedData = this.state.updatedData;
    updatedData.active = !updatedData.active;
    this.setState({ updatedData });
    updateUser({
      variables: { ..._.omit(updatedData, [dropdownData.fieldName, "email", "employee_number"]) },
    });
  };


  render() {
    let { user, position, dropdownData, updatedData } = this.props;

    return (
      <Mutation mutation={Update_User}>
        {(updateUser, { data }) => (
          <Mutation mutation={this.state.mutation}>
            {(updateUserAdditionalInfo, { data: data2 }) => (
              <React.Fragment>
                <td>
                  <PopUp
                    {...{
                      buttonLabel: "تعديل",
                      buttonColor: "success",
                      body: (
                        <UpdateMemberForm
                          clearData={this.clearData}
                          updateData={this.updateData}
                          user={user}
                          position={position}
                          dropdownData={dropdownData}
                        />
                      ),
                      submitLabel: "تعديل",
                      cancelLabel: "تراجع",
                      onSubmit: () => this.updateHandle(updateUser, updateUserAdditionalInfo)
                    }}
                  />
                </td>
                <td>
                  <button
                    className={`btn btn-${!this.state.updatedData.active ? "warning" : "danger"}`}
                    onClick={e => this.deleteHandle(updateUser)}
                  >
                    {!this.state.updatedData.active ? "تفعيل" : "إلغاء تفعيل"}
                  </button>
                </td>
              </React.Fragment>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

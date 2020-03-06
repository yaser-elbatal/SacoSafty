import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import axios from "axios"
import CreateUserForm from "./CreateUserForm"
import {
    Add_Member_To_Branch, Add_Member_To_Company, Add_Member_To_Department,
} from '../../../services/queries/Users';


export default class CreateMember extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createdData: {},
            data: {}
        }
    }

    componentDidMount() {
        let data = false;
        switch (this.props.type) {
            case "admin": data = { userType: "admin", createMutation: false, listAfterUpdateQuery: "ListAdmins" }; break;
            case "engineer": data = { userType: "engineer", createMutation: false, listAfterUpdateQuery: "ListEngineers" }; break;
            case "branches": data = { userType: "b_employee", createMutation: Add_Member_To_Branch, listAfterUpdateQuery: "ListBranchesUsers" }; break;
            case "maintainance": data = { userType: "company_user", createMutation: Add_Member_To_Company, listAfterUpdateQuery: "ListCompanyUsers" }; break;
            case "departments": data = { userType: "tech_user", createMutation: Add_Member_To_Department, listAfterUpdateQuery: "ListDepartmentUsers" }; break;
        }

        this.setState({ data })
    }

    updateData = (editedNewData) => {
        let createdData = this.state.createdData;
        this.setState({ createdData: { ...createdData, ...editedNewData } })
    }

    createUserAPI = async userData => {
        return await axios({
            method: "POST",
            data: userData,
            url: `http://68.183.13.171:3000/signup`,
            headers: { "content-type": `application/json` }
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

    createHandle = async (createUserMut) => {

        let adminUsername = (localStorage.getItem("sacoAdmin")) ? JSON.parse(localStorage.getItem("sacoAdmin")).username : ""

        let checkUserAPI = await this.checkUserAPI(adminUsername, this.state.createdData.myPassword);

        if (checkUserAPI.status == 200) {
            let { username, display_name, password, confirmPassword } = this.state.createdData

            let createUserAPI = await this.createUserAPI({
                username, display_name, password, confirmPassword,
                user_type: this.state.data.userType
            });


            if (createUserAPI.status == 200 && !["admin", "engineer"].includes(this.state.data.userType)) {
                createUserMut({
                    variables: {
                        ...(
                            this.props.type == "branches" &&
                            { email: this.state.createdData.email, employee_number: this.state.createdData.employee_number }
                        ),
                        ...this.state.createdData.dropdown,
                        user_id: createUserAPI.data.id
                    },
                })
            }
        }
    }


    render() {
        return this.state.data.createMutation ?

            <Mutation mutation={this.state.data.createMutation}>
                {(createUserMut, { data }) => {
                    return <CreateUserForm dropdownData={this.props.dropdownData} updateData={this.updateData} onSubmit={() => { this.createHandle(createUserMut); this.props.toggle(); }} />
                }}
            </Mutation>

            : <CreateUserForm dropdownData={this.props.dropdownData} updateData={this.updateData} onSubmit={() => { this.createHandle(); this.props.toggle(); }} />
    }
};
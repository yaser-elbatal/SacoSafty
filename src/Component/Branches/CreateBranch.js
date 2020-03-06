import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { AddBranch, EditCompBranch } from "../../Queries/BranshesQuery/BranchesList";
import CreateBranchForm from './CreateBranchForm';


export class CreateBranch extends Component {
    constructor() {
        super()
        this.state = {
            updateData: {}
        }
    };

    updateNewData = newData => {
        let updateData = this.state.updateData;
        this.setState({ updateData: { ...updateData, ...newData } });
    };

    createHandle = async (CreatBranch, updateID) => {
        let CretBranch = await CreatBranch();
        let { data: { insert_branch: { returning } } } = CretBranch;
        let id = returning[0].id
        let { slectedBranchId } = this.state.updateData
        console.log(slectedBranchId, id);

        await updateID({ variables: slectedBranchId, id });

    };

    render() {

        const { about, avatar, branchnumber, name, name_ar, contact_numbers, neighborhood, slectedBranchId } = this.state.updateData;
        console.log(this.state.updateData);

        return (
            <Mutation mutation={AddBranch} variables={{ about, avatar, branchnumber, name, name_ar, contact_numbers, neighborhood }}>
                {
                    (CreatBranch, { data }) => {
                        return (
                            <Mutation mutation={EditCompBranch} >
                                {

                                    (updateID, { dat }) => {
                                        return (

                                            <CreateBranchForm
                                                updateData={this.updateNewData}
                                                onSubmit={() => {
                                                    this.createHandle(CreatBranch, updateID);
                                                    this.props.toggle();
                                                }} />)
                                    }}
                            </Mutation>
                        )
                    }
                }

            </Mutation>
        )
    }
}

export default CreateBranch

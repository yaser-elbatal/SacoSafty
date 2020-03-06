import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Create_Company, List_Companies } from '../../../../services/queries/Maintainance/Companies'
import CreateCatForm from "./CreateCompanyForm"


export default class CreateCat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createdData: {}
        }
    }

    componentDidMount() {

    }

    updateData = (editedNewData) => {
        let createdData = this.state.createdData;
        this.setState({
            createdData: { ...createdData, ...editedNewData }
        })
    }

    createHandle = (createCat) => {
        createCat(
            {
                variables: { ...this.state.createdData },
                refetchQueries: [{ query: List_Companies }]
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Create_Company}>
                {(createCat, { data }) => {
                    return <CreateCatForm updateData={this.updateData} onSubmit={() => { this.createHandle(createCat); this.props.toggle(); }} />
                }}
            </Mutation>
        );
    }
};
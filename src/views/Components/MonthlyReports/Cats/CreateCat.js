import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Create_Cat } from '../../../../services/queries/MonthlyReports/Cats'
import CreateCatForm from "./CreateCatForm"


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
                refetchQueries: [`ListCats`]
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Create_Cat}>
                {(createCat, { data }) => {
                    return <CreateCatForm updateData={this.updateData} onSubmit={() => { this.createHandle(createCat); this.props.toggle(); }} />
                }}
            </Mutation>
        );
    }
};
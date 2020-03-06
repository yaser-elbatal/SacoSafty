import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Create_Item } from '../../../../services/queries/MonthlyReports/Items'
import _ from 'lodash'
import CreateItemForm from "./CreateItemForm"


export default class CreateItem extends Component {

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

    createHandle = (createItem) => {
        createItem(
            {
                variables: { ...this.state.createdData, category_id: this.props.category_id },
                refetchQueries: [`ListItems`]//{ query: List_Areas, variables: {city_id: this.props.city_id} }
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Create_Item}>
                {(createItem, { data }) => {
                    return <CreateItemForm updateData={this.updateData} onSubmit={() => { this.createHandle(createItem); this.props.toggle(); }} />
                }}
            </Mutation>
        );
    }
};
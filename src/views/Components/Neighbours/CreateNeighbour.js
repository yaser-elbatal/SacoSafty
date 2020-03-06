import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Create_Neighborhood } from '../../../services/queries/Neighbours'
import _ from 'lodash'
import CreateNeighbourForm from "./CreateNeighbourForm"


export default class CreateNeighbour extends Component {

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

    createHandle = (createNeighbour) => {
        createNeighbour(
            {
                variables: { ...this.state.createdData, area_id: this.props.area_id },
                refetchQueries: [`ListNeighborhood`]//{ query: List_Areas, variables: {city_id: this.props.city_id} }
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Create_Neighborhood}>
                {(createNeighbour, { data }) => {
                    return <CreateNeighbourForm updateData={this.updateData} onSubmit={() =>{ this.createHandle(createNeighbour); this.props.toggle();}} />
                }}
            </Mutation>
        );
    }
};
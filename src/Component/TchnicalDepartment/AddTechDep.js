import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { AddTchnicalDepartment } from '../../Queries/Techenical/techenical'
import AddTechDepForm from './AddTechDepForm'

export class AddTechDep extends Component {
    state = {
        updatedate: {}
    }

    updateddate = newData => {
        let { updatedate } = this.state
        this.setState({ updatedate: { ...updatedate, ...newData } })
    }
    CreateHandle = createDebart => {
        createDebart()

    }

    render() {
        const { name, name_ar } = this.state.updatedate;

        return (
            <Mutation mutation={AddTchnicalDepartment} variables={{ name, name_ar }} >
                {
                    (createDebart, { data }) => {
                        return (
                            <AddTechDepForm updatedate={this.updateddate}
                                onSubmit={() => { this.CreateHandle(createDebart); this.props.toggle() }} />
                        )
                    }
                }


            </Mutation>
        )
    }
}


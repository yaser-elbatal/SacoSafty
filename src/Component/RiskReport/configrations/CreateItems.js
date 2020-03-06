import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {
  Insert_Categories,
  List_Items,
  Insert_Items
} from "../../../Queries/RiskAssmentsQuery/RiskAssments";
import CreateItemsForm from "./CreateItemForm";

export class AddCategories extends Component {
  state = {
    updateData: {},
    summation: this.props.sum,
  };
  

  updateNewData = newData => {
    let updateData = this.state.updateData;

    this.setState({ updateData: { ...updateData, ...newData } });
  };

  createHandle =async createItem => {
    try {
      if (this.state.updateData.percentage != 0) {
        let created = await createItem();

        if (created)
          this.setState({
            summation: parseInt(this.state.summation) + parseInt(this.state.updateData.percentage)
          })
      }

    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');

    }
  };

  render() {

    const { title, title_ar, normal_state ,percentage} = this.state.updateData;
    return (
      <Mutation
        mutation={Insert_Items}
        variables={{
          title,
          title_ar,
          normal_state,
          category_id: this.props.category_id,
          percentage
        }}


      >
        {(createItem, { data }) => {
          return (
            <CreateItemsForm
              updateData={this.updateNewData}
              sum={this.state.summation}

              onSubmit={() => {
                this.createHandle(createItem);
                this.props.toggle();
                
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default AddCategories;

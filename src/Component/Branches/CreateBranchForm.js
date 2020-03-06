import React from 'react'
import { Form, FormGroup, Label, Input } from "reactstrap";
import SelectNeighbour from "../../views/Components/SelectNeighbour/SelectNeighbour"
import BranchCompany from './BranchCompany';



export default function CreateBranchForm(props) {

    const changeHandle = e => {
        if (props.updateData)
            props.updateData({ [e.target.name]: e.target.value });
    };

    const createHandle = e => {
        e.preventDefault();
        props.onSubmit && props.onSubmit();
    };

    const handleSelect = (e) => {
        props.updateData({ neighborhood: e.neighborhood ? e.neighborhood : false })
    }


    return (
        <Form>
            <FormGroup>
                <Label for="name_ar">اسم الفرع باللغة العربية</Label>
                <Input
                    type="text"
                    name="name_ar"
                    onChange={changeHandle}
                    defaultValue=""
                    placeholder="الاسم باللغة العربية"
                />
            </FormGroup>
            <FormGroup>
                <Label for="name">الاسم باللغة الإنجليزية</Label>
                <Input
                    type="text"
                    name="name"
                    onChange={changeHandle}
                    defaultValue=""
                    placeholder="الاسم باللغة الإنجليزية"
                />
            </FormGroup>
            <FormGroup>
                <Label for="about"> الوصف </Label>
                <Input
                    type="text"
                    name="about"
                    onChange={changeHandle}
                    defaultValue=""
                    id="about"
                    placeholder="  الوصف"
                />
            </FormGroup>
            <FormGroup>
                <Label for="contact_numbers"> رقم الاتصال </Label>
                <Input
                    type="text"
                    name="contact_numbers"
                    onChange={changeHandle}
                    defaultValue=""
                    id="contact_numbers"
                    placeholder="  رقم الاتصال"
                />
            </FormGroup>
            <FormGroup>
                <Label for="neighborhood">اختر الحي</Label>
                <SelectNeighbour onChange={handleSelect} />
            </FormGroup>
            <FormGroup>
                <Label for="branchnumber"> رقم الفرع </Label>
                <Input
                    type="text"
                    name="branchnumber"
                    onChange={changeHandle}
                    defaultValue=""
                    id="branchnumber"
                    placeholder=" رقم الفرع"
                />
            </FormGroup>
            <FormGroup>
                <Label for="avatar"> الصوره </Label>
                <Input
                    type="text"
                    name="avatar"
                    onChange={changeHandle}
                    defaultValue=""
                    id="avatar"
                    placeholder="  الصوره"
                />
            </FormGroup>
            <FormGroup>
                <Label for="branchnumber"> شركه الصيانه </Label>
                <BranchCompany updateData={props.updateData} />

            </FormGroup>

            <button className="btn btn-primary" onClick={createHandle}>
                إضافة
            </button>
        </Form>
    );
}



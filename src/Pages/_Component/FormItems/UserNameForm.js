import React from "react";
import { 
    Form,
    Input,
} from 'antd';

export const UserNameForm = () => {

    return (
        <Form.Item
            name="userName"
            label="User Name"
            rules={[
                {
                    min: 6,
                    message: "User Name should be more than 6"
                },
                {
                    required: true,
                    message: "User Name can not be empty"
                }
            ]}
        >
            <Input 
                placeholder="Input User Name"
            />
        </Form.Item>
    );
};
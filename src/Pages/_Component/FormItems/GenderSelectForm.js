import React from "react";
import { 
    Form,
    Select,
} from 'antd';

export const GenderSelectForm = () => {
    return (
        <Form.Item
            name="gender" 
            label="Gender"
            rules={[
                {
                    required: true,
                    message: "Gender can not be empty"
                }
            ]}
        >
            <Select
                placeholder="Select Gender"
            >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
            </Select>
        </Form.Item>
    );
};
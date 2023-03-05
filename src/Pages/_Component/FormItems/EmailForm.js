import React from "react";
import { 
    theme,
    Layout, 
    Menu, 
    Typography, 
    Breadcrumb, 
    Dropdown,
    Button,
    Divider,
    Form,
    Input,
} from 'antd';
const { Text, Title } = Typography;

export const EmailForm = ({name, label, help, validateStatus}) => {
    
    return (
        <Form.Item
            name={name}
            label={label}
            help={help}
            validateStatus={validateStatus}
            rules={[
                {
                    type: 'email',
                    message: 'Email belum Valid!',
                },
                {
                    required: true,
                    message: 'Email belum terisi!',
                },
            ]}
        >
            <Input 
                placeholder="Input Email"
            />
        </Form.Item>
    );
};
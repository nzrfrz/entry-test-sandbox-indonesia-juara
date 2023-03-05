import React from "react";
import { 
    Form,
    Input,
} from 'antd';

export const SimpleInputForm = ({name, label, prefix}) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={[
                {
                    required: true,
                    message: `${label} can not be empty`
                }
            ]}
        >
            <Input
                prefix={prefix}
                placeholder={`Input ${label}`}
                style={{
                    width: '100%',
                }}
            />
        </Form.Item>
    );
};
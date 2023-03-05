import React from "react";
import { 
    Form,
    InputNumber,
} from 'antd';

export const SimpleNumberForm = ({name, label}) => {
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
            <InputNumber
                controls={false}
                placeholder={`Input ${label}`}
                style={{
                    width: '100%',
                }}
            />
        </Form.Item>
    );
};
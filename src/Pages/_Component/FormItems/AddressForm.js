import React from "react";
import { 
    Form,
    Input,
} from 'antd';

export const AddressForm = ({name, label}) => {
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
            <Input.TextArea 
                placeholder="Input Address"
                autoSize={{
                    minRows: 2
                }}
            />
        </Form.Item>
    );
};
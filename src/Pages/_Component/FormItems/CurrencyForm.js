import React from "react";
import { 
    Typography,
    Form,
    Select,
    InputNumber,
} from 'antd';

const { Text, Title } = Typography;

export const CurrencyForm = ({name, label, prefix}) => {
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
                addonBefore={prefix}
                placeholder={`Input ${label}`}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                style={{
                    width: "100%"
                }}
            />
        </Form.Item>
    );
};
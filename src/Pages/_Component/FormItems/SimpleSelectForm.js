import React from "react";
import { 
    Form,
    Select,
} from 'antd';

export const SimpleSelectForm = ({name, label, optionSelect}) => {
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
            <Select
                showSearch
                allowClear
                placeholder={`Select ${label}`}
                style={{
                    width: "100%"
                }}
            >
                {
                    optionSelect?.map((data, index) => 
                        <Select.Option key={index} value={data.value} >{data.label}</Select.Option>
                    )
                }
            </Select>
        </Form.Item>
    );
};
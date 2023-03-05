import React from "react";
import { 
    Form,
    Input,
    InputNumber
} from 'antd';

export const OtherNumber = ({name, label}) => {

    return (
        <Form.Item
            label={label}
            required={true}
        >
            <Input.Group compact>
                <Form.Item
                    name={[name, 'areaCode']}
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: "",
                        },
                    ]}
                >
                    <InputNumber
                        controls={false}
                        placeholder="Code"
                        style={{
                            width: '30%',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    noStyle
                    name={[name, 'phoneNumber']}
                    rules={[
                        {
                            required: true,
                            message: `Area Code or ${label} can not be empty`,
                        },
                    ]}
                >
                    <InputNumber
                        controls={false}
                        placeholder={`Input ${label}`}
                        style={{
                            width: '70%',
                        }}
                    />
                </Form.Item>
            </Input.Group>
        </Form.Item>
    );
};
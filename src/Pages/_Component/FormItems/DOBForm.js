import React from "react";
import { 
    Form,
    DatePicker,
} from 'antd';
// import dayjs from "dayjs";

export const DOBForm = () => {
    return (
        <Form.Item
            name="dateOfBirth"
            label="Date Of Birth"
            format="YYYY-MM-DD"
            // initialValue={{ dateOfBirth: dayjs("2022-21-03") }}
            rules={[
                {
                    type: "object",
                    required: true,
                    message: "Date Of Birth can not be empty"
                }
            ]}
        >
            <DatePicker 
                format="YYYY-MM-DD"
                style={{
                    width: "100%"
                }}            
            />
        </Form.Item>
    );
};
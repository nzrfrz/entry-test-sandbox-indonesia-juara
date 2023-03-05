import React, { useEffect, useState } from "react";
import { 
    Form,
    Input,
    Select,
    InputNumber
} from 'antd';

import { useCachedData } from "../../../../_services";
import { ReactCountryFlag } from "react-country-flag"

const { Option } = Select;

export const MobileNumber = ({name, label}) => {
    // const [dialCode, setDialCode] = useState([]);

    // useEffect(() => {
    //     getDialCode(setDialCode);
    // }, []);

    const fetchedData = useCachedData(["phoneDialCode"]);
    const dialCode = fetchedData.data;

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
                    <Select 
                        showSearch
                        allowClear
                        placeholder="Code"
                        style={{
                            width: '30%',
                        }}
                    >
                        {
                            dialCode?.map((data, index) => 
                                <Option key={index} value={data.dial_code} >
                                    <ReactCountryFlag
                                        svg
                                        countryCode={data.code}
                                        aria-label={data.name}
                                    />
                                    &nbsp;&nbsp;
                                    {data.dial_code}
                                </Option>
                            )
                        }
                    </Select>
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
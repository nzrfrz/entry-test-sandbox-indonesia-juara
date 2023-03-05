import React from "react";

import {
    Input, 
    Tooltip, 
    Button, 
    ConfigProvider 
} from "antd";
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

export const EntryTestSearchInput = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 50
                },
            }}
        >
            <Search
                allowClear
                size="large"
                enterButton="Cari"
                placeholder="Cari Wisata"
                prefix={<SearchOutlined />}
                width={"100%"}
                // onSearch={onSearch}
            />
        </ConfigProvider>
    );
};
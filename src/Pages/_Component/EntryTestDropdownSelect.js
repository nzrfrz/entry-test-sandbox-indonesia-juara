import React, { useMemo } from "react";

import {
    Input, 
    Tooltip, 
    Button, 
    Select,
    ConfigProvider 
} from "antd";
import { useCachedData } from "../../_services";

const { Search } = Input;

export const EntryTestDropdownSelect = () => {
    const cachedData = useCachedData(["tourismObjectCategory"]);

    const tourismCategoryOptions = useMemo(() => {
        return cachedData?.data?.map((data) => {
            return {
                label: data.label,
                value: data.slug
            }
        });
    }, [cachedData]);

    return (
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 50
                },
            }}
        >
            <Select
                showSearch
                allowClear
                size="large"
                placeholder="Pilih Kategori"
                optionFilterProp="children"
                // onChange={onChange}
                // onSearch={onSearch}
                style={{ 
                    width: "100%"
                }}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={tourismCategoryOptions}
            />
        </ConfigProvider>
    );
};
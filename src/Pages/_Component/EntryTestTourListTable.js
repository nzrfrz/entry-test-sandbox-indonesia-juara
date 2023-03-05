import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { 
    Table,
    Typography,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { useCachedData } from "../../_services";

import {
    ButtonWarning, 
    TableButtonDelete,
    TableButtonViewDetail,
} from "../_Component";

const { Text } = Typography;

export const EntryTestTourListTable = () => {
    const navigateTo = useNavigate();

    const cachedData = useCachedData(["tourismObjectList"]);

    const tableData = useMemo(() => {
        return cachedData?.data?.map((data, index) => {
            return {
                ...data,
                id: index
            }
        });
    }, [cachedData?.data]);
    // console.log(tableData);

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            width: 50,
            render: (_, record) => (
                <div className="">
                    <Text>{record.id + 1}</Text>
                </div>
            )
        },
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: 'Harga',
            dataIndex: 'price',
            key: 'price',
            width: 100,
        },
        {
            title: 'Kategori',
            dataIndex: 'age',
            key: 'age',
            width: 100,
            render: (_, record) => (
                <div className="">
                    <Text>{record.category_data.label}</Text>
                </div>
            )
        },
        {
            title: 'Actions',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <div className="table-action-button-container">
                    <TableButtonViewDetail 
                        onClick={() => {
                            // setIsModalFormOpen(true);
                            // setHTTPMethod("viewDetail");
                            // setFormFieldValue(record);
                        }}
                    />
                    <ButtonWarning 
                        icon={<EditOutlined />}
                        onClick={() => {
                            navigateTo(
                                "/wisata_saya/edit_wisata",
                                {
                                    state: {
                                        method: "Edit", 
                                        data: record
                                    }
                                }
                            );
                            // setIsModalFormOpen(true);
                            // setHTTPMethod("put");
                            // setFormFieldValue(record);
                        }}
                    />
                    <TableButtonDelete 
                        rowData={record.name}
                        onClick={() => {
                            // mutateData.mutateAsync(record.id);
                        }}
                    />
                </div>
            )
        },
    ];
    
    return (
        <>
        <Table 
            // loading={fetchedData?.fetchStatus === "fetching" || mutateData?.status === "loading" ? true : false}
            rowKey={(record) => record.id} 
            columns={columns} 
            dataSource={tableData}
            scroll={{ x: "100%" }}
        />
        </>
    );
};
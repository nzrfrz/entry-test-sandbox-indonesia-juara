import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { EntryTestSearchInput, EntryTestTourListTable } from "./_Component";

import { useLocalToken } from "../_services";

export const MyTour = () => {
    const navigateTo = useNavigate();

    const token = useLocalToken();

    if (token === null) return <Navigate to={"/error"} replace />

    return (
        <div className="tour-page-container">
            <div className="nav-container">
                <EntryTestSearchInput />
                <Button
                    size="large"
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        navigateTo("/wisata_saya/tambah_wisata");
                    }}
                >
                    Tambah
                </Button>
            </div>
            <div className="table-container">
                <EntryTestTourListTable />
            </div>
        </div>
    );
};
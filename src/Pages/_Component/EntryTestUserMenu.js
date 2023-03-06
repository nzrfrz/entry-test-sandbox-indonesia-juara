import React from "react";

import { 
    Dropdown,
    Typography, 
} from "antd";
import { DownOutlined } from '@ant-design/icons';

import { useLocalToken } from "../../_services";

const { Text } = Typography;

const items = [
    {
        key: 1,
        label: (
            <span >Profil Saya</span>
        )
    },
    {
        key: 2,
        label: (
            <span >Ubah Password</span>
        )
    },
    {
        key: 3,
        label: (
            <span >Keluar</span>
        )
    }
];

export const EntryTestUserMenu = ({navigateTo, mutateLogout, mutateLogin, cachedData, getLocalToken}) => {
    
    const handleMenuClick = (e) => {
        switch (e.key) {
            case "1":
                navigateTo("/profil_saya");
                break;
            case "2":
                navigateTo("/ubah_password");
                break;
            case "3":
                const getRefreshToken = JSON.parse(getLocalToken).refresh;
                mutateLogout.mutateAsync({"refresh": getRefreshToken});
                mutateLogin.reset();
                break;
            default:
                break;
        }
    };
    
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <Dropdown
            menu={menuProps}
        >
            <div className="dropdown-button-container">
                <img src={cachedData?.data?.photo} alt="profile" />
                <Text>{cachedData?.data?.full_name}</Text>
                <DownOutlined />
            </div>
        </Dropdown>
    );
};
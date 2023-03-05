import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import { theme,Typography } from "antd";

const { Text } = Typography

export const DashboardLayout = () => {

    const {
        token: { 
            colorPrimary,
        },
    } = theme.useToken();

    return (
        <div className="dashboard-container">
            <div 
                className="sidebar-nav"
                style={{
                    "--activeLink": colorPrimary,
                }}
            >
                <NavLink to={"/profil_saya"} rel="noopener noreferrer">
                    <Text>Profil Saya</Text>
                </NavLink>
                <NavLink to={"/wisata_saya"} rel="noopener noreferrer">
                    <Text>Wisata Saya</Text>
                </NavLink>
            </div>
            <div className="dashboard-content">
                <Outlet />
            </div>
        </div>
    );
};
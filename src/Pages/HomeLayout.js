import React, { useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
    theme, 
    Form,
    Layout, 
    Menu, 
    Typography, 
    Breadcrumb, 
    Dropdown,
    Button,
    Divider,
} from 'antd';
import {
    HomeOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { GlobalContext } from "../App";

import sandboxLogo from "../_assets/sandbox-logo.png";

import { EntryTestModalLogin, EntryTestUserMenu } from "./_Component";

import { entryTestLogin, entryTestLogout, useAuthMutate, useLocalToken, useGetUserEntryTest, useCachedData } from "../_services";

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

export const HomeLayout = () => {
    const navigateTo = useNavigate();
    const { apiNotif } = useContext(GlobalContext);

    const [form] = Form.useForm();

    const [isModalFormOpen, setIsModalFormOpen] = useState(false);

    const mutateLogin = useAuthMutate("Login", ["userProfile"], entryTestLogin, "token", form, apiNotif, setIsModalFormOpen);
    const mutateLogout = useAuthMutate("Logout", ["userProfile"], entryTestLogout, undefined, undefined, apiNotif, undefined, navigateTo);
    const cachedData = useCachedData(["userProfile"]);
    const getLocalToken = useLocalToken();
    // const getUserProfile = useGetUserEntryTest(undefined, mutateLogin?.data?.access || JSON.parse(getLocalToken)?.access);
    // console.log("MUTATE LOGIN: ", mutateLogin?.data?.access || JSON.parse(getLocalToken)?.access);
    // console.log(`MUTATE LOGIN: ${mutateLogin?.data?.access}  LOCAL TOKEN: ${JSON.parse(getLocalToken)?.access}`);
    // console.log("MUTATE LOGOUT: ", mutateLogout);
    // console.log("GET USER PROFILE: ", cachedData);

    const [windowDimension, setWindowDiemnsion] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const getSize = () => {
        setWindowDiemnsion({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', getSize);
        return () => {
            window.removeEventListener('resize', getSize);
        };
    }, [windowDimension.width, windowDimension.height]);

    // console.log(JSON.parse(checkToken));

    const {
        token: { 
            colorBgContainer,
        },
    } = theme.useToken();
    // console.log(colorBgContainer);

    return (
        <Layout
            style={{
                height: window.innerHeight,
            }}
        >
            <Header 
                className="header-container"
                style={{
                    backgroundColor: "white"
                }}
            >
                <div 
                    className="logo-container" 
                    onClick={() => {
                        navigateTo("/");
                    }}
                >
                    <img src={sandboxLogo} />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {
                        (cachedData?.data === undefined || getLocalToken === null) && (mutateLogin?.data === undefined || mutateLogout?.isSuccess === true) ?
                        <Button
                            type="primary"
                            shape="round"
                            disabled={false}
                            onClick={() => {
                                setIsModalFormOpen(true);
                            }}
                        >
                            Login
                        </Button>
                        :
                        <EntryTestUserMenu 
                            navigateTo={navigateTo}
                            mutateLogout={mutateLogout}
                            mutateLogin={mutateLogin}
                            cachedData={cachedData}
                            getLocalToken={getLocalToken}
                        />
                    }
                </div>
            </Header>
            <Content
                style={{
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    transition: "all 0.5s"
                }}
            >
                <div
                    className="site-content"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "180px",
                        backgroundColor: colorBgContainer
                    }}
                >
                    <Outlet />
                </div>
                <Footer 
                    style={{ 
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        height: "180px",
                        gap: "30px",
                        backgroundColor: "#2B2C2B"
                    }}
                >
                    <div className="footer-logo-container" >
                        <img src={sandboxLogo} alt="profile" />
                    </div>
                    <div className="footer-straight-line" />
                </Footer>
            </Content>

            <EntryTestModalLogin 
                isModalFormOpen={isModalFormOpen}
                setIsModalFormOpen={setIsModalFormOpen}
                formProps={form}
                mutateLogin={mutateLogin}
            />
        </Layout>
    );
};
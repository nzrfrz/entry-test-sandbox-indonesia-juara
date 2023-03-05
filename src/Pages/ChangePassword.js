import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";

import { 
    Button,
    Form,
    Typography 
} from "antd";

import { PasswordForm } from "./_Component";

import { entryTestChangePassword, useAuthMutate, useLocalToken } from "../_services";

const { Title, Text } = Typography;

export const ChangePassword = () => {
    const [form] = Form.useForm();
    const { apiNotif } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    const mutateData = useAuthMutate("Change Password", entryTestChangePassword, undefined, form, apiNotif);
    const localToken = useLocalToken();

    const onFinish = (values) => {
        const accessToken = JSON.parse(localToken)?.access;
        const dataForm = {
            old_password: values.old_password,
            new_password: values.new_password
        };
        
        mutateData.mutateAsync({dataForm, accessToken});
        // console.log(accessToken);
    };

    return (
        <div className="change-password-container">
            <Title>Ubah Password</Title>
            <Form
                form={form}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                onFinish={onFinish}
                style={{
                    width: "auto",
                }}
                scrollToFirstError
            >
                <PasswordForm 
                    name="old_password"
                    label="Password Lama"
                    withConfirmPassword={false}
                />
                <PasswordForm 
                    name="new_password"
                    label="Password Baru"
                    confirmPasswordLabel="Konfirmasi Password Baru"
                    withConfirmPassword={true}
                />

                <Form.Item>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                        <Button
                            type="default"
                            shape="round"
                            onClick={() => {
                                navigateTo("/");
                            }}
                        >
                            <Text>Batal</Text>
                        </Button>
                        <Button
                            type="primary"
                            shape="round"
                            htmlType="submit"
                        >
                            Simpan
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};
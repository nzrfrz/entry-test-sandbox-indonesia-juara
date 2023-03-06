import React from "react";

import { 
    Modal, 
    Form,
    Button
} from "antd";
import { VscKey } from "react-icons/vsc";

import { EmailForm, PasswordForm } from "./FormItems";

export const EntryTestModalLogin = ({isModalFormOpen, setIsModalFormOpen, formProps, mutateLogin}) => {

    // console.log(mutateLogin);

    const onFinishForm = (values) => {
        // console.log(values);
        mutateLogin.mutateAsync(values);
    };

    return (
        <Modal 
            title={"Login"} 
            okText={"Login"}
            open={isModalFormOpen} 
            onCancel={() => {
                formProps.resetFields();
                mutateLogin.reset();
                setIsModalFormOpen(false);
            }}
            footer={
                <div
                    style={{ 
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Button
                        type="primary"
                        shape="round"
                        loading={mutateLogin?.status === "loading" ? true : false}
                        style={{
                            width: "257px"
                        }}
                        onClick={() => {
                            formProps.validateFields()
                                .then((values) => {
                                    onFinishForm(values);
                                })
                                .catch((info) => {
                                    console.log('Validate Failed:', info);
                                });
                        }}
                    >
                        Login
                    </Button>
                </div>
            }
        >
            <div className="modal-form-container" style={{ paddingTop: "24px" }}>
                <Form
                    form={formProps}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                    name="login"
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                    // disabled={httpMethod === "viewDetail" ? true : false}
                >
                    <EmailForm 
                        name="email"
                        label="Email"
                        help={mutateLogin?.error === null ? undefined : `${mutateLogin?.error?.response?.data?.detail}`}
                        validateStatus={mutateLogin?.error === null ? undefined : "error"}
                    />
                    <PasswordForm 
                        withConfirmPassword={false}
                        prefix={<VscKey />}
                        help={mutateLogin?.error === null ? undefined : `${mutateLogin?.error?.response?.data?.detail}`}
                        validateStatus={mutateLogin?.error === null ? undefined : "error"}
                    />
                </Form>
            </div>
        </Modal>
    );
};
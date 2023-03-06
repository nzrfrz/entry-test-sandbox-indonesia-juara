import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../App";

import { 
    Form,
    Button,
    Upload,
    Typography 
} from "antd";
import { CameraOutlined } from '@ant-design/icons';

import profilePic from "../_assets/entryTest_profilePhoto.png";
import { AddressForm, EmailForm, SimpleInputForm, SimpleNumberForm } from "./_Component";

import { getBase64 } from "../_helper";
import { useLocalToken, useGetUserEntryTest, entryTestChangeProfile, useAuthMutate, useMutateData, useCachedData } from "../_services";

const { Text } = Typography

export const MyProfile = () => {
    const [form] = Form.useForm();
    const { apiNotif } = useContext(GlobalContext);

    const [profilePicFile, setProfilePicFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);

    const localToken = useLocalToken();
    const mutateData = useMutateData("put", entryTestChangeProfile, ["userProfile"], undefined, apiNotif);
    const cachedData = useCachedData(["userProfile"]);

    const handlePreviewImage = async (file) => {
        await getBase64(file.originFileObj)
        .then((data) => {
            // console.log(data);
            setPreviewImage(data);
        })
    };

    const onFinish = (values) => {
        // console.log(values);
        const accessToken = JSON.parse(localToken)?.access;
        const dataForm = {
            ...values,
            photo: profilePicFile
        };
        // console.log(dataForm);
        
        mutateData.mutateAsync({dataForm, accessToken});
    };

    useEffect(() => {
        form.setFieldsValue({
            full_name: cachedData?.data?.full_name,
            email: cachedData?.data?.email,
            address: cachedData?.data?.address,
            handphone: cachedData?.data?.handphone,
        });
    }, [cachedData]);

    if (localToken === null) return <Navigate to={"/error"} replace />

    return (
        <div className="profile-page-container">
            <div className="profile">
                <div className="image-container">
                    <img src={previewImage !== undefined ? previewImage : cachedData?.data?.photo} />
                    <Upload
                        name="avatar"
                        showUploadList={false}
                        previewFile={false}
                        onChange={({file}) => {
                            const newFile = new File([file.originFileObj], file.name, { type: file.type });
                            setProfilePicFile(newFile);
                            handlePreviewImage(file);
                        }}
                    >
                        <Button 
                            type="primary"
                            shape="circle"
                            icon={<CameraOutlined />}
                        />
                    </Upload>
                </div>
                <div className="profile-info">
                    <Text>{cachedData?.data?.full_name}</Text>
                    <Text>{cachedData?.data?.address}</Text>
                </div>
                <div className="save-button">
                    <Form
                        form={form}
                    >
                        <Form.Item>
                            <Button 
                                type="primary"
                                shape="round"
                                size="large"
                                htmlType="submit"
                            >
                                Simpan
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className="form-edit-profile">
                <Form
                    form={form}
                    // wrapperCol={{ span: 24 }}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{
                        width: "auto",
                    }}
                    scrollToFirstError
                >
                    <SimpleInputForm 
                        name="full_name"
                        label="Nama"
                    />
                    <EmailForm 
                        name="email"
                        label="Email"
                    />
                    <AddressForm 
                        name="address"
                        label="Alamat"
                    />
                    <SimpleNumberForm 
                        name="handphone"
                        label="No Handphone"
                    />
                </Form>
            </div>
        </div>
    );
};
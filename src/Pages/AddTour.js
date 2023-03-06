import React, { useMemo, useState, useContext, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

import { 
    Form,
    Button,
    Upload,
    Typography 
} from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { GlobalContext } from "../App";

import { 
    AddressForm,
    CurrencyForm, 
    SimpleInputForm, 
    SimpleSelectForm 
} from "./_Component";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { MapLeaflet } from "./_Component";

import { useLocalToken, useCachedData, useMutateData } from "../_services";
import { entryTestTourismSpotNew, entryTestTourismSpotEdit } from "../_services/http";
import { getBase64, toTitleCase } from "../_helper";

import defaultUploadImage from "../_assets/upload-image-illustrator.png";

const { Title, Text } = Typography;

export const AddTour = () => {
    const navigateTo = useNavigate();
    const [form] = Form.useForm();
    const {state} = useLocation();
    const { apiNotif } = useContext(GlobalContext);

    const [tourismPic, setTourismPic] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);
    const [CKEditorData, setCKEditorData] = useState("Input Deskripsi");
    const [position, setPosition] = useState([0, 0]);

    // console.log(state?.data?.location.coordinates);
    // console.log("POSITION: ", position);

    const mutatePost = useMutateData("post", entryTestTourismSpotNew, ["tourismObjectListMe"], undefined, apiNotif, undefined, navigateTo, "/wisata_saya");
    const mutatePatch = useMutateData("put", entryTestTourismSpotEdit, ["tourismObjectListMe"], undefined, apiNotif, undefined, navigateTo, "/wisata_saya");
    const cachedData = useCachedData(["tourismObjectCategory"]);
    const localToken = useLocalToken();

    const tourismCategoryOptions = useMemo(() => {
        return cachedData?.data?.map((data) => {
            return {
                label: data.label,
                value: data.slug
            }
        });
    }, [cachedData]);

    const handlePreviewImage = async (file) => {
        await getBase64(file.originFileObj)
        .then((data) => {
            // console.log(data);
            setPreviewImage(data);
        })
    };

    const onFinish = (values) => {
        const location = {
            type: "Point",
            coordinates: [
                state?.data === undefined ? position.lng : position[1],
                state?.data === undefined ? position.lat : position[0],
            ],
        };
        const accessToken = JSON.parse(localToken)?.access;
        const dataForm = {
            ...values,
            slug: values.name,
            name: toTitleCase(values.name),
            price: values.price.toString(),
            description: CKEditorData,
            image: tourismPic,
            category_data: cachedData?.data?.filter((data) => values.category === data.slug).shift(),
            location: JSON.stringify(location),
            // location: location,
        };

        if (state?.data === undefined) {
            mutatePost.mutateAsync({dataForm, accessToken});
        }
        else {
            mutatePatch.mutateAsync({dataForm, accessToken, slug: state?.data?.slug});
        }
        // console.log(location.coordinates);
    };

    // console.log(state?.data?.slug);

    const tourismImage = useMemo(() => {
        switch (true) {
            case previewImage !== undefined:
                return previewImage;
            case state?.data !== undefined:
                return state?.data.image;
            default:
                return defaultUploadImage;
        }
    }, [previewImage, state?.data]);

    useEffect(() => {
        if (state?.data !== undefined) {
            fetch(`https://${state?.data?.image.replace("http://", "")}`)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                setTourismPic(file);
            })
            .catch(error => {
                console.log(error);
            });

            setCKEditorData(state?.data.description);
            setPosition([state?.data?.location?.coordinates[1], state?.data?.location?.coordinates[0]]);
            form.setFieldsValue({
                slug: state?.data.slug,
                name: state?.data.name,
                price: state?.data.price,
                category: state?.data?.category,
                address: state?.data?.address,
                location: JSON.stringify(state?.data?.location),
            });
        }
    }, [state?.data]);

    if (localToken === null) return <Navigate to={"/error"} replace />

    return (
        <div className="add-tour-container">
            <Title>{state?.method !== "Edit" ? "Tambah" : "Edit"} Wisata</Title>
            <div className="uploader-container">
                <Text>Upload Gambar</Text>
                <img src={tourismImage} />
                <div className="upload-button">
                    <Upload
                        showUploadList={false}
                        previewFile={false}
                        onChange={({file}) => {
                            const newFile = new File([file.originFileObj], file.name, { type: file.type });
                            setTourismPic(newFile);
                            handlePreviewImage(file);
                        }}
                        // onPreview={onPreview}
                    >
                        <Button
                            type="primary"
                            shape="round"
                            size="large"
                            icon={<CloudUploadOutlined />}
                        >
                            Upload
                        </Button>
                    </Upload>
                </div>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{
                    width: "auto",
                }}
            >
                <SimpleInputForm 
                    name="name"
                    label="Nama"
                />
                <CurrencyForm 
                    name="price"
                    label="Harga"
                    prefix="Rp."
                />
                <SimpleSelectForm 
                    name="category"
                    label="Kategori"
                    optionSelect={tourismCategoryOptions}
                />
            </Form>

            <div className="ck-editor-container">
                <Text>Deskripsi</Text>
                <CKEditor
                    editor={ ClassicEditor }
                    data={CKEditorData}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setCKEditorData(data);
                    }}
                />
            </div>

            
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{
                    width: "auto",
                }}
            >
                <AddressForm 
                    name="address"
                    label="Alamat"
                />
            </Form>

            <MapLeaflet 
                position={position}
                setPosition={setPosition}
            />

            <Form
                form={form}
                onFinish={onFinish}
                style={{
                    width: "auto",
                }}
            >
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "12px" }}>
                    <Button
                        type="default"
                        shape="round"
                        onClick={() => {
                            form.resetFields();
                            navigateTo("/wisata_saya");
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
            </Form>
            
        </div>
    );
};
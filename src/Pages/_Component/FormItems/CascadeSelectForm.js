import React, { useEffect, useMemo, useState } from "react";
import { 
    theme, 
    Form,
    Input,
    Cascader,
    Typography,
} from 'antd';

import { getIndonesiaRegionData } from "../../../_services/http/regionData";

const { Text, Title } = Typography;

export const CascadeSelectForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [regionData, setRegionData] = useState([]);
    const [parentData, setParentData] = useState([]);

    const loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        targetOption.loading = false;
        targetOption.children = (() => {
            switch (targetOption.type) {
                case "Provinsi":
                    return regionData.filter((data) => data.kodeProvinsi === targetOption.code)
                    .map((dataRegency) => {
                        return {
                            value: dataRegency.name,
                            label: dataRegency.name,
                            code: dataRegency.kode,
                            type: dataRegency.type,
                            isLeaf: false
                        }
                    });
                case "Kabupaten":
                    return regionData.filter((data) => data.kodeKabupaten === targetOption.code)
                    .map((dataSubDistrict) => {
                        return {
                            value: dataSubDistrict.name,
                            label: dataSubDistrict.name,
                            code: dataSubDistrict.kode,
                            type: dataSubDistrict.type,
                            isLeaf: false
                        }
                    });
                case "Kecamatan":
                    return regionData.filter((data) => data.kodeKecamatan === targetOption.code)
                    .map((dataVillage) => {
                        return {
                            value: dataVillage.name,
                            label: dataVillage.name,
                            code: dataVillage.kode,
                            type: dataVillage.type,
                        }
                    });
                default:
                    break;
            }
        })()
        setParentData([...parentData]);

        console.log(targetOption);
    };

    // console.log(regionData.filter((data) => data.type === "Provinsi"));

    useEffect(() => {
        getIndonesiaRegionData(setIsLoading, setRegionData, setParentData);
    }, []);

    return (
        <Form.Item
            name="personalAddressRegion"
            label="Address Region"
            // rules={[
            //     {
            //         required: true,
            //         message: "Address region can not be empty"
            //     }
            // ]}
        >
            <Cascader
                changeOnSelect
                loading={isLoading} 
                placeholder="Select Region"
                options={parentData}
                loadData={(selectOptions) => {
                    loadData(selectOptions);
                }}
                style={{
                    width: "inherit"
                }}
            />
        </Form.Item>
    );
};
import React from "react";
import { useNavigate } from "react-router-dom";

import { 
    Tag,
    Typography 
} from "antd";

import { 
    EntryTestSearchInput, 
    EntryTestDropdownSelect 
} from "./_Component";

import { useCachedData } from "../_services";

import geoData from "../_assets/mapData.json";

const { Title, Text } = Typography;

export const ContentPage = () => {
    const navigateTo = useNavigate();

    const cachedData = useCachedData(["tourismObjectList"]);
    // console.log(cachedData?.data);

    function getText(html){
        var divContainer = document.createElement("div");
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || "";
    };

    // const data = geoData;

    // for (let i = 0; i < data.data.coordinates[0].length; i++) {
    //     const arrayToSwap = data.data.coordinates[0][i];
    //     data.data.coordinates[0][i] = [arrayToSwap[1], arrayToSwap[0]];
    // }

    // console.log(data);

    return (
        <div 
            className="content-page-container"
        >
            <div className="top-section">
                <Title>Wisata</Title>
                <div className="content-page-separator" />
                <Text>Temukan wisata menarik disini</Text>
                <div className="filter-container">
                    <div className="filter-search-cotnainer">
                        <EntryTestSearchInput 
                        />
                    </div>
                    <div className="filter-select-cotnainer">
                        <EntryTestDropdownSelect 
                        />
                    </div>
                </div>
            </div>
            <div className="bottom-section">

                {
                    cachedData?.data?.map((data, index) => 
                    <div 
                        key={index} 
                        className="tourism-object-card"
                        onClick={() => {
                            navigateTo(
                                `/detail_wisata/${data.name}`,
                                {
                                    state: {
                                        method: "View Detail", 
                                        data: data
                                    }
                                }
                            );
                        }}
                    >
                        <div className="card-image-container">
                            <img src={data.image} alt="profile" />
                        </div>
                        <div className="card-label-container">
                            <Tag color={"#F7911A33"} style={{ borderRadius: "17px", padding: "5px 10px" }}>
                                <Text style={{ color: "#F7911A" }}>{data.category_data.label}</Text>
                            </Tag>
                            <Text>{data.price}</Text>
                        </div>
                        <div className="card-content-container">
                            <Title level={5}>{data.name}</Title>
                            <div id="desc">
                                <Text ellipsis={false}>{getText(data.description).slice(0, 100)}...</Text>
                            </div>
                        </div>
                    </div>
                    )
                }

            </div>
        </div>
    );
};
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import 'dayjs/locale/id';

import { 
    Tag,
    Typography 
} from "antd";

import priceIcon from "../_assets/detailPagePriceIcon.png";
import contactIcon from "../_assets/detailPageContactIcon.png";

import iconFB from "../_assets/icons8-facebook-96.png";
import iconWA from "../_assets/icons8-whatsapp-96.png";
import iconTele from "../_assets/icons8-telegram-app-96.png";
import iconPin from "../_assets/icons8-pinterest-96.png";
import iconTwit from "../_assets/icons8-twitter-96.png";

import { useCachedData, useGetUserEntryTest, useLocalToken } from "../_services";

import { MapLeaflet } from "./_Component";

dayjs.locale("id");
const { Title, Text } = Typography;
const socialMediaIcon = [
    {
        label: "facebook",
        icon: iconFB,
    },
    {
        label: "whatsapp",
        icon: iconWA,
    },
    {
        label: "telegram",
        icon: iconTele,
    },
    {
        label: "pinterest",
        icon: iconPin,
    },
    {
        label: "twitter",
        icon: iconTwit,
    },
];

export const TourismDetail = () => {
    const {state} = useLocation();
    const getLocalToken = useLocalToken();

    const getUserProfile = useCachedData(["userProfile"]);
    
    const [position, setPosition] = useState([0, 0]);

    useEffect(() => {
        setPosition([state?.data?.location?.coordinates[1], state?.data?.location?.coordinates[0]]);
    }, [state]);

    function getText(html) {
        var divContainer = document.createElement("div");
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || "";
    };

    return (
        <div className="tourism-detail-container">
            <div className="top-section">
                <Title>Wisata</Title>
                <div className="content-page-separator" />
            </div>
            <div className="content-container">

                <img src={state?.data?.image} />

                <div className="author-container">
                    <img src={getUserProfile?.data?.photo} />
                    <div className="author-content">
                        <div className="author-top-section">
                            <Text style={{ fontSize: "24px" }}>{getUserProfile?.data?.full_name}</Text>
                            <Tag color={"#F7911A33"} style={{ borderRadius: "17px", padding: "5px 10px" }}>
                                <Text style={{ color: "#F7911A", fontSizeL: "12px" }}>{getUserProfile?.data?.role}</Text>
                            </Tag>
                        </div>
                        <div className="author-bottom-section">
                            <Text style={{ fontSize: "18px" }}>Diposting pada {dayjs(getUserProfile?.data?.created).format("DD MMMM YYYY")}</Text>
                        </div>
                    </div>
                </div>

                <div className="description-container">
                    <Text>{getText(state?.data?.description)}</Text>
                </div>

                <div className="tourism-object-info">
                    <div className="tourism-object-price">
                        <img src={priceIcon} />
                        <div className="price-info">
                            <Text style={{ fontSize: "16px" }}>Harga</Text>
                            <Text style={{ fontSize: "18px", fontWeight: 600 }}>Rp. {state?.data?.price}</Text>
                        </div>
                    </div>
                    <div className="tourism-object-contact">
                        <img src={contactIcon} />
                        <div className="contact-info">
                            <Text style={{ fontSize: "16px" }}>No. Telpon</Text>
                            <Text style={{ fontSize: "18px", fontWeight: 600 }}>0821-4245-5563</Text>
                        </div>
                    </div>
                </div>

                <div className="share-button-container">
                    <Text style={{ fontSize: "18px", fontWeight: 600 }}>Share Wisata Ini</Text>
                    <div className="social-button">
                        {
                            socialMediaIcon.map((data, index) => 
                                <img key={index} src={data.icon} alt={data.label} />
                            )
                        }
                    </div>
                </div>

                <MapLeaflet 
                    position={position}
                    setPosition={setPosition}
                    // lat={state.data.location.coordinates[0]}
                    // long={state.data.location.coordinates[1]}
                />

            </div>
        </div>
    );
};
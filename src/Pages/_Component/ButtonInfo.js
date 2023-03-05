import React from "react";
import {
    Button,
    ConfigProvider,
} from "antd";

export const ButtonInfo = ({loading, shape, style, text, htmlType, icon, onClick}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#33b5e5',
                    colorPrimaryHover: '#0099CC',
                    colorPrimaryActive: "rgba(0, 153, 204, 0.5)"
                },
            }}
        >
            <Button
                loading={loading}
                className="button-info"
                shape={shape}
                type="primary"
                htmlType={htmlType}
                icon={icon}
                style={style}
                onClick={onClick}
            >
                {text}
            </Button>
        </ConfigProvider>
    );
};
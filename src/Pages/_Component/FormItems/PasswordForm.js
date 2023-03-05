import React from "react";
import { 
    Form,
    Input,
} from 'antd';

export const PasswordForm = ({name = "password", label = "Password", confirmPasswordName = "confirmPassword", confirmPasswordLabel = "Confirm Password", withConfirmPassword, prefix, help, validateStatus}) => {
    
    return (
        <>
        <Form.Item
            name={name}
            label={label}
            help={help}
            validateStatus={validateStatus}
            rules={[
                {
                    required: true,
                    message: 'Password belum terisi!',
                },
            ]}
            hasFeedback
        >
            <Input.Password 
                prefix={prefix}
                placeholder={`Masukkan ${label}`}
            />
        </Form.Item>
        
        {
            withConfirmPassword === false ?
            null
            :
            <Form.Item
                name={confirmPasswordName}
                label={confirmPasswordLabel}
                dependencies={[name]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukkan Password ulang',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue(name) === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Password Tidak Sama'));
                        },
                    }),
                ]}
            >
                <Input.Password 
                    placeholder={`Masukkan ${confirmPasswordLabel}`}
                />
          </Form.Item>
        }
        </>
    );
};
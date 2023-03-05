import { CiPercent } from "react-icons/ci";
import { FcInfo } from "react-icons/fc";

import offer1 from "../images/discount-offer-1.jpg";
import offer2 from "../images/discount-offer-2.jpg";
import offer3 from "../images/discount-offer-3.jpg";
import offer4 from "../images/discount-offer-4.jpg";
import offer5 from "../images/discount-offer-5.jpg";

export const updateInfoList = () => {
    return [
        {
            title: "Li Europan lingues es mem U+1F4AF",
            description: "Lorem ipsum dolor sit amet U+1F4A8, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa U+1F925. Cum sociis natoque pe",
            date: "2023-02-02T04:10:46.129Z",
            category: "Offer",
            icon: <CiPercent style={{ color: "green" }} />,
            image: offer1
        },
        {
            title: "U+1F9D9 The European languages ar U+1F4AF",
            description: "The quick, brown fox jumps over a lazy dog. DJs U+1F9CD flock by when MTV ax quiz prog. Junk MTV quiz U+1F3C3 graced by fox whelps. Bawds jog,.",
            date: "2023-01-26T04:17:24.427Z",
            category: "Info",
            icon: <FcInfo />,
            image: undefined
        },
        {
            title: "The quick, brown fox jump U+1F33C",
            description: "One morning U+1F96C, when Gregor Samsa woke from troubled dreams U+1F35E, he found himself transformed in his bed into a horrible vermin U+1F32E. He lay",
            date: "2023-01-21T04:17:56.704Z",
            category: "Offer",
            icon: <CiPercent  style={{ color: "green" }} />,
            image: offer2
        },
        {
            title: "Far far away, behind the U+1F36E",
            description: "A wonderful serenity has U+1F371 taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole hea",
            date: "2023-01-12T04:20:37.131Z",
            category: "Info",
            icon: <FcInfo />,
            image: undefined
        },
        {
            title: "U+1F3C8 But I must explain to you U+1F9FF",
            description: "But I must explain to you how all this mistaken idea of denouncing pleasure U+1F5FF and praising pain was born and I will give you a com",
            date: "2023-01-09T04:24:39.883Z",
            category: "Offer",
            icon: <CiPercent  style={{ color: "green" }} />,
            image: offer3
        },
        {
            title: "Lorem ipsum dolor sit ame U+1F91E",
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pen",
            date: "2023-01-04T04:25:23.587Z",
            category: "Offer",
            icon: <CiPercent  style={{ color: "green" }} />,
            image: offer4
        },
        {
            title: "Far far away, behind the U+1F36E",
            description: "A wonderful serenity has U+1F371 taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole hea",
            date: "2022-12-29T04:27:18.177Z",
            category: "Info",
            icon: <FcInfo />,
            image: undefined
        },
        {
            title: "Lorem ipsum dolor sit ame U+1F91E",
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pen",
            date: "2022-12-29T04:27:18.177Z",
            category: "Offer",
            icon: <CiPercent  style={{ color: "green" }} />,
            image: offer5
        },
    ]
}
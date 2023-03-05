import React from "react";
import { 
    Route, 
    Routes, 
} from "react-router-dom";

import { HomeLayout } from "../Pages/HomeLayout";
import { DashboardLayout } from "../Pages/DashboardLayout";
import { MyProfile } from "../Pages/MyProfile";
import { MyTour } from "../Pages/MyTour";
import { AddTour } from "../Pages/AddTour";
import { ErrorPage } from "../Pages/ErrorPage";
import { ChangePassword } from "../Pages/ChangePassword";
import { TourismDetail } from "../Pages/TourismDetail";

import { ContentPage } from "../Pages/ContentPage";

export const MainRoutes = () => {

    return (
        <Routes>

            <Route path="/" element={<HomeLayout />} >
                <Route path={"/"} element={<ContentPage />} />
                <Route path={"/"} element={<DashboardLayout />} >
                    <Route path={"/profil_saya"} element={<MyProfile />} />
                    <Route path={"/wisata_saya"} element={<MyTour />} />
                    <Route path={"/wisata_saya/:operation"} element={<AddTour />} />
                </Route>                
                <Route path={"/detail_wisata/:tourismName"} element={<TourismDetail />} />
                <Route path={"/ubah_password"} element={<ChangePassword />} />

                <Route path="/*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
};
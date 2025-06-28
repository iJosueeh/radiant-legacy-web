import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";

const DashboardLayout = ({ children }) => {
    return (
        <div className="container-fluid px-3 px-md-5 dashboard-wrapper">
            <div className="row pt-5">
                <div className="col-md-4 col-lg-3 mb-4">
                    <DashboardSidebar />
                </div>
                <div className="col-md-8 col-lg-9">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
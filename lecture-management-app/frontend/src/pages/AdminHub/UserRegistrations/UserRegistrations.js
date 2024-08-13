import React from "react";
import '../AdminHub.css';
import { UserRegTable } from "../../../tables/UserRegTable";


export const UserRegistrations = () => {
 
  return (
    <div className="admin-page-main">
      <div className="admin-page-container">
        <div className="admin-page-content">
        <div className="admin-page-actions">
              <div className="admin-table">
                <UserRegTable/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

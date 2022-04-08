import React from "react";
import { useNavigate } from "react-router-dom";
import { cookie } from "../../apiCall";
import './Header.css';

export const Header = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="">
                <div className="row header-container">
                    <div className="col-2" style={{cursor: 'pointer'}} onClick={() => navigate('/')}>
                        Home
                    </div>
                    <div className="col-8"></div>
                    {cookie.get('type') === 'ADMIN' ?
                    <div className="col" style={{cursor: 'pointer'}} onClick={( ) => navigate('/Admin/CreateExam')}>
                        Create Exam
                    </div> : null}
                </div>
            </div>
        </>
    )
}
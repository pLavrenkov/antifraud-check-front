import React from 'react'

const Preloader = ({ isOpen }) => {
    return (
        <div className={isOpen ? "preloader preloader_type_opened" : "preloader"}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;

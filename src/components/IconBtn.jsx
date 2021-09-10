import { memo } from 'react';

const IconBtn = ({ Icon, onClick }) => {
    return (
        <button onClick={onClick}>
            <Icon className="icons" />
        </button>
    );
};

export default memo(IconBtn);

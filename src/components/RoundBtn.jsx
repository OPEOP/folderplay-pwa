import { memo } from 'react';

const RoundBtn = ({ icon, color }) => {
    return (
        <button
            h="3.5rem"
            w="3.5rem"
            bg={`${color}700`}
            hoverBg={`${color}800`}
            rounded="circle"
            m={{ r: "1rem" }}
            shadow="1"
            hoverShadow="2"
        >
            <icon name={icon} size="20px" color="white" />
        </button>
    );
};

export default memo(RoundBtn);

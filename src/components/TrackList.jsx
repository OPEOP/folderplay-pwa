import { memo } from 'react';
import { arrayOf,  func, string } from 'prop-types';

const TrackList = ({ tracks, selected, onClick }) => {
    return (
        <ul>
            {
                tracks.map(title => (
                    <li
                        className="pointer"
                        key={title}
                        onClick={() => onClick(title)}
                    >
                        <p className={`${title === selected ? 'selectedSong' : ''}`}>
                            {title}
                        </p>
                    </li>
                ))
            }
        </ul>
    );
};

TrackList.defaultName = "SongList";

TrackList.propTypes = {
    tracks: arrayOf(string),
    selected: string,
    onClick: func,
};

export default memo(TrackList);

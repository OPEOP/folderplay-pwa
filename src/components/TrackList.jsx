import { memo } from 'react';
import { arrayOf, func, string } from 'prop-types';

const TrackList = ({ tracks, selected, onClick }) => {
    return (
        <ul className="trackList">
            {
                tracks.map(title => {
                    const trimmedTitle = title.slice(0, title.length - 3);
                    const isSelected = title === selected;

                    return (
                        <li
                            className={`track ${isSelected ? 'selectedSong' : ''}`}
                            key={title}
                            onClick={() => onClick(title)}
                        >
                            {`${isSelected ? '> ' : ''}${trimmedTitle}`}
                        </li>
                    );
                })
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

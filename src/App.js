import { useEffect, useMemo } from 'react';
import { useFilePicker } from 'use-file-picker';
import { useIndexedDBStore } from 'use-indexeddb';

import './styles.css';
import { IconBtn, TrackList } from './components';
import { useAudioController } from './hooks';
import { ReactComponent as Play } from './icons/play.svg';
import { ReactComponent as Pause } from './icons/pause.svg';
import { ReactComponent as Next } from './icons/next.svg';
import { ReactComponent as Prev } from './icons/previous.svg';
import { ReactComponent as Folder } from './icons/folder.svg';

const SONGS_ID = 1;

// TODO: Add saving of last played track position

const App = () => {
    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        readAs: 'DataURL',
        accept: '.mp3',
    });
    const [
        {
            isPlaying,
            tracks,
            currentTrack,
            duration,
            trackProgress,
            audioRef,
        },
        {
            onPlay,
            onPause,
            onNextTrack,
            onPrevTrack,
            onTrackChange,
            onProgressBarChange,
            onProgressBarChangeEnd,
        },
        { onTracksChange }
    ] = useAudioController([]);
    const { add, getByID, deleteByID } = useIndexedDBStore("files");

    useEffect(() => {
        getByID(SONGS_ID)
            .then(data => {
                if (data) {
                    const { tracks: newTracks } = data;
                    onTracksChange(newTracks);
                }
            })
            .catch(e => console.log('==>db get all error: ', e));
    }, []);

    const setAddedSongs = files => {
        onTracksChange(files)
        const newTracks = [];

        files.forEach(file => {
            newTracks.push({ name: file.name, content: file.content })
        });

        add({ tracks: newTracks, id: SONGS_ID }).catch(e => console.log('==>db add error: ', e));
    };

    useEffect(() => {
        if (filesContent.length) {
            if (tracks.length) {
                deleteByID(SONGS_ID)
                    .then(() => {
                        setAddedSongs(filesContent);
                    })
                    .catch(e => console.log('==>db clear error: ', e));
            } else {
                setAddedSongs(filesContent);
            }
        }
    }, [filesContent]);

    const handleClick = async () => {
        try {
            await openFileSelector();
        } catch (e) {
            console.log('==>Explorer select error: ', e);
        }
    };

    const tracksNames = useMemo(() => tracks.map(({ name }) => name), [tracks]);

    // TODO: use clear css without any framework
    // TODO: Get controls and disign from https://codesandbox.io/s/react-audio-player-demo-zwhoc?file=/src/AudioPlayer.jsx

    const getReadableDuration = duration => {
        if (!duration) {
            return '00:00:00';
        }

        const durationDate = new Date(duration * 1000);

        return durationDate.toUTCString().split(' ')[4];
    }

    return (
        <div className="card">
            <IconBtn
                onClick={handleClick}
                Icon={Folder}
            />
            <img className="trackImg" alt="autumn" />
            <TrackList
                tracks={tracksNames}
                selected={currentTrack?.name}
                onClick={onTrackChange}
            />
            <audio
                hidden
                ref={audioRef}
                className="audio"
                controls
                src={currentTrack?.content}
            >
                Your browser does not support the
                <code>audio</code> element.
            </audio>
            <p>{getReadableDuration(duration - trackProgress)}</p>
            <input
                className="progress"
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : 0}
                onChange={onProgressBarChange}
                onMouseUp={onProgressBarChangeEnd}
                onDragEnd={onProgressBarChangeEnd}
            />
            <div className="btnGroup">
                <IconBtn onClick={onPrevTrack} Icon={Prev} />
                {
                    isPlaying
                        ? <IconBtn onClick={onPause} Icon={Pause} />
                        : <IconBtn onClick={onPlay} Icon={Play} />

                }
                <IconBtn onClick={onNextTrack} Icon={Next} />
            </div>
        </div>
    );
};

export default App;

import { useEffect, useRef, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import { useIndexedDBStore } from 'use-indexeddb';

import './App.css';
import { RoundBtn } from './components';

const SONGS_ID = 1;

const App = () => {
    const [openFileSelector, { filesContent, loading }] = useFilePicker({
        readAs: 'DataURL',
        accept: '.mp3',
    });
    const audioRef = useRef();
    const { add, getByID, deleteByID } = useIndexedDBStore("files");
    const [selectedSong, setSelectedSong] = useState(null);
    const [songList, setSongList] = useState([]);

    useEffect(() => {
        getByID(SONGS_ID)
            .then(data => {
                if (data) {
                    const { songs } = data;
                    setSelectedSong(songs[0]);
                    setSongList(songs);
                }
            })
            .catch(e => console.log('==>db get all error: ', e));
    }, []);

    const setAddedSongs = files => {
        setSelectedSong(files[0]);
        setSongList([...files]);
        const songs = [];

        files.forEach(file => {
            songs.push({ name: file.name, content: file.content })
        });

        add({ songs, id: SONGS_ID }).catch(e => console.log('==>db add error: ', e));
    };

    useEffect(() => {
        if (filesContent.length) {
            if (songList.length) {
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

    const handleSelectListFile = (name) => {
        const selected = songList.find(file => file.name === name);
        setSelectedSong(selected);
    };

    console.log('==>audioRef', audioRef.current?.autoPlay);

    // TODO: use clear css without any framework
    // TODO: Get controls and disign from https://codesandbox.io/s/react-audio-player-demo-zwhoc?file=/src/AudioPlayer.jsx

    return (
        <div className="container">
                <div className="card">
                    <div>
                        <p textSize="heading" m={{ xs: "1rem" }}>PWA Player</p>
                        <button
                            onClick={handleClick}
                            disable={loading}
                            h="2rem"
                            p={{ x: "0.75rem" }}
                            textSize="caption"
                            textColor="info700"
                            hoverTextColor="info900"
                            bg="white"
                            hoverBg="info200"
                            border="1px solid"
                            borderColor="info700"
                            hoverBorderColor="info900"
                            m={{ r: "0.5rem" }}
                        >
                            Choose Folder
                        </button>
                        <ul>
                            {
                                songList.map((file) => (
                                    <li
                                        className="pointer"
                                        key={file.name}
                                        onClick={() => handleSelectListFile(file.name)}
                                    >
                                        <p
                                            textColor={file.name === selectedSong?.name ? "success700" : "success500"}>
                                            {file.name}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <audio
                        ref={audioRef}
                        className="audio"
                        controls
                        src={selectedSong?.content}
                        autoPlay
                    >
                        Your browser does not support the
                        <code>audio</code> element.
                    </audio>
                    <div
                        d="flex"
                        align="center"
                        flexDir="row"
                        justify="center"
                        p={{ xs: "2rem" }}
                    >
                        <RoundBtn icon="PlayPrev" color="success" />
                        <button
                            h="3.5rem"
                            w="3.5rem"
                            bg="success800"
                            hoverBg="success600"
                            rounded="circle"
                            m={{ r: "1rem" }}
                            shadow="2"
                            hoverShadow="4"
                        >
                            <icon name="Play" size="18px" color="white" />
                            /
                            <icon name="Pause" size="18px" color="white" />
                        </button>
                        <RoundBtn icon="Stop" color="brand" />
                        <RoundBtn icon="PlayNext" color="success" />
                    </div>

                </div>
        </div>
    );
};

export default App;

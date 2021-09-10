import { useEffect, useReducer, useRef } from 'react';

import { audioReducer, initState, actions } from '../redux';

const useAudioController = ({ tracks = [] }) => {
    const [state, dispatch] = useReducer(audioReducer, { ...initState, tracks });

    const audioRef = useRef();

    useEffect(() => {
        if (state.isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [state.isPlaying]);

    const onPlay = () => {
        dispatch(actions.startTrack());
    };

    const onPause = () => {
        dispatch(actions.pauseTrack());
    };

    const onNextTrack = () => {
        dispatch(actions.nextTrack());
    };

    const onPrevTrack = () => {
        dispatch(actions.prevTrack());
    };

    const onTracksChange = (newTracks = []) => {
        dispatch(actions.changeTracks(newTracks));
    };

    const onTrackChange = (name = []) => {
        dispatch(actions.changeTrack(name));
    };

    return [
        {
            ...state,
            duration: audioRef.current?.duration,
            audioRef
        },
        {
            onPlay,
            onPause,
            onNextTrack,
            onPrevTrack,
            onTrackChange,
        },
        {
            onTracksChange
        }
    ];
}

export default useAudioController;

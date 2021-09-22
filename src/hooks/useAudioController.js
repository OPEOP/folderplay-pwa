import { useEffect, useReducer, useRef, useState } from 'react';

import { audioReducer, initState, actions } from '../redux';

const useAudioController = ({ tracks = [] }) => {
    const [{
        isPlaying,
        tracks: initiatedTracks,
        currentTrack
    }, dispatch] = useReducer(audioReducer, {
        ...initState,
        tracks
    });
    const [trackProgress, setTrackProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef();
    const intervalRef = useRef();

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current?.ended) {
                onNextTrack();
            } else {
                setTrackProgress(audioRef.current?.currentTime);
            }
        }, 1000);
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
            startTimer();
        } else {
            audioRef.current?.pause();
            clearInterval(intervalRef.current);
        }
    }, [isPlaying, currentTrack]);

    useEffect(() => {
        setDuration(audioRef.current?.duration)
    }, [audioRef.current?.duration])

    const onPlay = () => {
        dispatch(actions.playTrack());
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

    const onProgressBarChange = ({ target: { value } }) => {
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current?.currentTime);
    };

    const onProgressBarChangeEnd = () => {
        if (!isPlaying) {
            dispatch(actions.playTrack());
        }
        startTimer();
    };

    return [
        {
            isPlaying,
            tracks: initiatedTracks,
            currentTrack,
            duration,
            trackProgress,
            audioRef
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
        {
            onTracksChange
        }
    ];
}

export default useAudioController;

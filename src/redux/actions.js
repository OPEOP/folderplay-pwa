import { ACTION_TYPES } from '../constants';

const playTrack = () => ({
  type: ACTION_TYPES.STARTED_TRACK
});

const pauseTrack = () => ({
    type: ACTION_TYPES.PAUSED_TRACK
});

const stopTrack = () => ({
    type: ACTION_TYPES.STOPPED_TRACK
});

const nextTrack = () => ({
    type: ACTION_TYPES.NEXT_TRACK
});

const prevTrack = () => ({
    type: ACTION_TYPES.PREV_TRACK
});

const changeTracks = (tracks) => ({
    type: ACTION_TYPES.CHANGED_TRACKS,
    payload: { tracks }
});

const changeTrack = (trackName) => ({
    type: ACTION_TYPES.CHANGED_TRACK,
    payload: { trackName }
});

const changeProgressBar = (progress) => ({
    type: ACTION_TYPES.CHANGED_PROGRESS_BAR,
    payload: { progress }
});

export default {
    playTrack,
    pauseTrack,
    stopTrack,
    nextTrack,
    prevTrack,
    changeTracks,
    changeTrack,
    changeProgressBar,
};

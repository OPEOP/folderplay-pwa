import { ACTION_TYPES } from '../constants';

const startTrack = () => ({
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

export default {
    startTrack,
    pauseTrack,
    stopTrack,
    nextTrack,
    prevTrack,
    changeTracks,
    changeTrack,
};

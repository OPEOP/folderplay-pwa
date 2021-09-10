import { ACTION_TYPES } from '../constants';

export const initState = {
    isPlaying: false,
    trackIndex: 0,
    currentTrack: null,
    tracks: []
};

export const audioReducer = (state, action) => {
    switch (action.type) {
    case ACTION_TYPES.STARTED_TRACK: {
        return {
            ...state,
            isPlaying: true,
        };
    }
    case ACTION_TYPES.PAUSED_TRACK: {
        return {
            ...state,
            isPlaying: false,
        };
    }
    case ACTION_TYPES.STOPPED_TRACK: {
        return {
            ...state,
            isPlaying: false,
        };
    }
    case ACTION_TYPES.NEXT_TRACK: {
        const nextIndex = state.trackIndex < state.tracks.length - 1
            ? state.trackIndex + 1
            : state.trackIndex;

        return {
            ...state,
            trackIndex: nextIndex,
            currentTrack: state.tracks[nextIndex],
            isPlaying: true,
        };
    }
    case ACTION_TYPES.PREV_TRACK: {
        const prevIndex = state.trackIndex > 0
            ? state.trackIndex - 1
            : state.trackIndex;

        return {
            ...state,
            trackIndex: prevIndex,
            currentTrack: state.tracks[prevIndex],
            isPlaying: true,
        };
    }
    case ACTION_TYPES.CHANGED_TRACK: {
        const selectedTrackIndex = state.tracks.findIndex(({name}) => name === action.payload.trackName);
        const selectedTrack = { ...state.tracks[selectedTrackIndex] };

        return {
            ...state,
            trackIndex: selectedTrackIndex,
            currentTrack: selectedTrack,
            isPlaying: true,
        };
    }
    case ACTION_TYPES.CHANGED_TRACKS: {
        return {
            ...state,
            trackIndex: 0,
            currentTrack: action.payload.tracks[0],
            tracks: action.payload.tracks,
            isPlaying: false,
        };
    }
    default:
        return state;
    }
}

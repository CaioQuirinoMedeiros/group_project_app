import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/**
 * Actions & Types
 */
const { Types, Creators } = createActions({
  getTeamsRequest: null,
  getTeamsSuccess: ['data'],
  getTeamsFailure: null,
  selectTeam: ['team'],
  openTeamModal: null,
  closeTeamModal: null,
  createTeamRequest: ['name'],
  createTeamSuccess: ['team'],
});

export const TeamsTypes = Types;
export default Creators;

/**
 * Initial state
 */
const INITIAL_STATE = Immutable({
  data: [],
  teamModalOpen: false,
  active: null,
});

/**
 * Reducers
 */
const getSuccess = (state, { data }) => state.merge({ data });

const selectTeam = (state, { team }) => state.merge({ active: team });

const openTeamModal = state => state.merge({ teamModalOpen: true });

const closeTeamModal = state => state.merge({ teamModalOpen: false });

const createSuccess = (state, { team }) => state.merge({ data: [...state.data, team] });

/**
 * Reducers to types
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TEAMS_SUCCESS]: getSuccess,
  [Types.SELECT_TEAM]: selectTeam,
  [Types.OPEN_TEAM_MODAL]: openTeamModal,
  [Types.CLOSE_TEAM_MODAL]: closeTeamModal,
  [Types.CREATE_TEAM_SUCCESS]: createSuccess,
});

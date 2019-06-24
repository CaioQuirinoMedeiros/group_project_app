/* eslint-disable max-len */
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/**
 * Actions & Types
 */
const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
  openProjectModal: null,
  closeProjectModal: null,
  createProjectRequest: ['title'],
  createProjectSuccess: ['project'],
  deleteProjectRequest: ['id'],
  deleteProjectSuccess: ['id'],
});

export const ProjectsTypes = Types;
export default Creators;

/**
 * Initial state
 */
const INITIAL_STATE = Immutable({
  data: [],
  projectModalOpen: false,
});

/**
 * Reducers
 */
const getSuccess = (state, { data }) => state.merge({ data });

const openModal = state => state.merge({ projectModalOpen: true });

const closeModal = state => state.merge({ projectModalOpen: false });

const createSuccess = (state, { project }) => state.merge({ data: [...state.data, project] });

const deleteSuccess = (state, { id }) => state.merge({ data: state.data.filter(project => project.id !== id) });

/**
 * Reducers to types
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: getSuccess,
  [Types.OPEN_PROJECT_MODAL]: openModal,
  [Types.CLOSE_PROJECT_MODAL]: closeModal,
  [Types.CREATE_PROJECT_SUCCESS]: createSuccess,
  [Types.DELETE_PROJECT_SUCCESS]: deleteSuccess,
});

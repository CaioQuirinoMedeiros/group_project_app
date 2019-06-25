import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/**
 * Actions & Types
 */
const { Types, Creators } = createActions({
  getMembersRequest: null,
  getMembersSuccess: ['data'],
  updateMemberRequest: ['id', 'roles'],
  inviteMemberRequest: ['email'],
});

export const MembersTypes = Types;
export default Creators;

/**
 * Initial state
 */
const INITIAL_STATE = Immutable({
  data: [],
  membersModalOpen: false,
});

/**
 * Reducers
 */
const getSuccess = (state, { data }) => state.merge({ data });

const updateMember = (state, { id, roles }) => state.merge({
  data: state.data.map(member => (member.id === id ? { ...member, roles } : member)),
});
/**
 * Reducers to types
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_MEMBERS_SUCCESS]: getSuccess,
  [Types.UPDATE_MEMBER_REQUEST]: updateMember,
});

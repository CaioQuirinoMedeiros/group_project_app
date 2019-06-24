/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { ToastActionsCreators } from 'react-native-redux-toast';

import api from '../../services/api';

import TeamsActions from '../ducks/teams';

export function* getTeams() {
  const response = yield call(api.get, 'teams');

  yield put(TeamsActions.getTeamsSuccess(response.data));
}

export function* createTeam({ name }) {
  try {
    const response = yield call(api.post, 'teams', { name });

    yield put(TeamsActions.createTeamSuccess(response.data));
    yield put(TeamsActions.closeTeamModal());

    yield put(ToastActionsCreators.displayInfo('Time criado com sucesso'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Erro ao criar time'));
  }
}

export function* setActiveTeam({ team }) {
  yield call([AsyncStorage, 'setItem'], '@group_project:team', JSON.stringify(team));
}

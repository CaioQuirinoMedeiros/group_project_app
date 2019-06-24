/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';

import api from '../../services/api';

import ProjectsActions from '../ducks/projects';

export function* getProjects() {
  const response = yield call(api.get, 'projects');

  yield put(ProjectsActions.getProjectsSuccess(response.data));
}

export function* createProject({ title }) {
  try {
    const response = yield call(api.post, 'projects', { title });

    yield put(ProjectsActions.createProjectSuccess(response.data));

    yield put(ToastActionsCreators.displayInfo('Projeto criado com sucesso'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Erro ao criar projeto'));
  }
}

export function* deleteProject({ id }) {
  try {
    yield call(api.delete, `projects/${id}`);

    yield put(ProjectsActions.deleteProjectSuccess(id));

    yield put(ToastActionsCreators.displayInfo('Projeto deletado com sucesso'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Erro ao deletar projeto'));
  }
}

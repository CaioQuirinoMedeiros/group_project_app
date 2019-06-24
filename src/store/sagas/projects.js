/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';

import { actions as toastrActions } from 'react-redux-toastr';

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
    yield put(ProjectsActions.closeProjectModal());
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro, tente novamente',
      }),
    );
  }
}

export function* deleteProject({ id }) {
  try {
    yield call(api.delete, `projects/${id}`);

    yield put(ProjectsActions.deleteProjectSuccess(id));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro ao tentar deletar o projeto',
      }),
    );
  }
}

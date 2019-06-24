/* eslint-disable import/no-cycle */
import { call, put } from 'redux-saga/effects';

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
    console.log(err);
  }
}

export function* deleteProject({ id }) {
  try {
    yield call(api.delete, `projects/${id}`);

    yield put(ProjectsActions.deleteProjectSuccess(id));
  } catch (err) {
    console.log(err);
  }
}

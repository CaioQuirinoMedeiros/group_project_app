import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';

import ProjectsActions from '../../store/ducks/projects';

import NewProject from '../NewProject';
import Can from '../Can';

import styles from './styles';

class Projects extends Component {
  static propTypes = {
    getProjectsRequest: PropTypes.func.isRequired,
    deleteProjectRequest: PropTypes.func.isRequired,
    activeTeam: PropTypes.shape().isRequired,
    projects: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) getProjectsRequest();
  }

  toggleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  toggleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  deleteProject = (id) => {
    const { deleteProjectRequest } = this.props;

    deleteProjectRequest(id);
  };

  render() {
    const { projects, activeTeam } = this.props;
    const { isModalOpen } = this.state;

    if (!activeTeam) return null;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.projectsList}
          data={[...projects.data]}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.projectContainer}>
              <Text style={styles.projectTitle}>{item.title}</Text>
              <TouchableOpacity
                hitSlop={{
                  top: 10,
                  right: 10,
                  bottom: 10,
                  left: 10,
                }}
                onPress={() => this.deleteProject(item.id)}
              >
                <Icon name="delete" size={22} color="#7289DA" />
              </TouchableOpacity>
            </View>
          )}
        />

        <Can checkPermission="projects_create">
          <TouchableOpacity style={styles.newProjectButton} onPress={this.toggleModalOpen}>
            <Icon name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </Can>

        <NewProject visible={isModalOpen} onRequestClose={this.toggleModalClose} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  activeTeam: state.teams.active,
});

const mapDispatchToProps = dispatch => bindActionCreators(ProjectsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);

/* eslint-disable max-len */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  View, TouchableOpacity, Image, FlatList,
} from 'react-native';

import TeamActions from '../../store/ducks/teams';
import AuthActions from '../../store/ducks/auth';

import NewTeam from '../NewTeam';

import styles from './styles';

class TeamSwitcher extends Component {
  static propTypes = {
    teams: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ),
    }).isRequired,
    getTeamsRequest: PropTypes.func.isRequired,
    selectTeam: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const { getTeamsRequest } = this.props;

    getTeamsRequest();
  }

  toggleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  toggleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  signOut = () => {
    const { signOut } = this.props;

    signOut();
  };

  renderTeam = ({ item }) => {
    const { selectTeam } = this.props;

    return (
      <TouchableOpacity style={styles.teamContainer} onPress={() => selectTeam(item)}>
        <Image
          style={styles.teamAvatar}
          source={{
            uri: `https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${
              item.name
            }`,
          }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { teams } = this.props;
    const { isModalOpen } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={teams.data}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderTeam}
        />

        <TouchableOpacity style={styles.newTeam} onPress={this.toggleModalOpen}>
          <Icon name="add" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logOut} onPress={this.signOut}>
          <Icon name="clear" size={24} color="#e83f19" />
        </TouchableOpacity>

        <NewTeam visible={isModalOpen} onRequestClose={this.toggleModalClose} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...TeamActions, ...AuthActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamSwitcher);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity, Switch,
} from 'react-native';

import api from '../../services/api';

import Modal from '../Modal';
import Can from '../Can';

import MembersActions from '../../store/ducks/members';

import styles from './styles';

class RoleUpdater extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    member: PropTypes.shape({
      roles: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
        }),
      ),
    }).isRequired,
    updateMemberRequest: PropTypes.func.isRequired,
  };

  state = {
    roles: [],
  };

  async componentDidMount() {
    const response = await api.get('roles');

    this.setState({ roles: response.data });
  }

  handleRoleChange = (value, role) => {
    const { updateMemberRequest, onRequestClose, member } = this.props;

    const roles = value
      ? [...member.roles, role]
      : member.roles.filter(memberRole => memberRole.id !== role.id);

    updateMemberRequest(member.id, roles);
    onRequestClose();
  };

  render() {
    const { visible, onRequestClose, member } = this.props;
    const { roles } = this.state;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <View>
          {roles.map(role => (
            <View key={role.id} style={styles.roleContainer}>
              <Text style={styles.roleText}>{role.name}</Text>

              <Can checkRole="administrator">
                {!(
                  role.slug === 'administrator'
                  && member.roles.find(memberRole => memberRole.id === role.id)
                ) && (
                  <Switch
                    value={!!member.roles.find(memberRole => memberRole.id === role.id)}
                    onValueChange={value => this.handleRoleChange(value, role)}
                  />
                )}
              </Can>
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={onRequestClose} style={styles.cancel}>
          <Text style={styles.cancelText}>Voltar</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(RoleUpdater);

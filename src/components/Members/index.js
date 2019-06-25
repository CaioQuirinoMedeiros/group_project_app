import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MembersActions from '../../store/ducks/members';

import RoleUpdater from '../RoleUpdater';
import InviteMember from '../InviteMember';
import Can from '../Can';

import styles from './styles';

class Members extends Component {
  static propTypes = {
    getMembersRequest: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          user: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
      ),
    }).isRequired,
  };

  state = {
    isInviteModalOpen: false,
    isRoleModalOpen: false,
    memberEdit: null,
  };

  componentDidMount() {
    const { getMembersRequest } = this.props;

    getMembersRequest();
  }

  toggleInviteModalOpen = () => {
    this.setState({ isInviteModalOpen: true });
  };

  toggleInviteModalClose = () => {
    this.setState({ isInviteModalOpen: false });
  };

  toggleRoleModalOpen = (member) => {
    this.setState({ isRoleModalOpen: true, memberEdit: member });
  };

  toggleRoleModalClose = () => {
    this.setState({ isRoleModalOpen: false, memberEdit: null });
  };

  render() {
    const { members } = this.props;
    const { isInviteModalOpen, isRoleModalOpen, memberEdit } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>MEMBROS</Text>

        <FlatList
          style={styles.memberList}
          ListFooterComponent={() => (
            <Can checkPermission="invites_create">
              <TouchableOpacity style={styles.button} onPress={this.toggleInviteModalOpen}>
                <Text style={styles.buttonText}>Convidar</Text>
              </TouchableOpacity>
            </Can>
          )}
          data={members.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberName}>{item.user.name}</Text>

              <Can checkRole="administrator">
                <TouchableOpacity
                  hitSlop={{
                    top: 15,
                    right: 15,
                    bottom: 15,
                    left: 15,
                  }}
                  onPress={() => this.toggleRoleModalOpen(item)}
                >
                  <Icon name="settings" size={20} color="#b0b0b0" />
                </TouchableOpacity>
              </Can>
            </View>
          )}
        />

        <Can checkPermission="invites_create">
          <InviteMember visible={isInviteModalOpen} onRequestClose={this.toggleInviteModalClose} />
        </Can>
        {memberEdit && (
          <RoleUpdater
            visible={isRoleModalOpen}
            onRequestClose={this.toggleRoleModalClose}
            member={memberEdit}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);

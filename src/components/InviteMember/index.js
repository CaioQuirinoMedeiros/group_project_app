import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, TextInput, TouchableOpacity } from 'react-native';

import MembersActions from '../../store/ducks/members';

import Modal from '../Modal';

import styles from './styles';

class InviteMember extends Component {
  state = {
    email: '',
  };

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    inviteMemberRequest: PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    const { inviteMemberRequest, onRequestClose } = this.props;
    const { email } = this.state;

    inviteMemberRequest(email);
    onRequestClose();

    this.setState({ email: '' });
  };

  render() {
    const { visible, onRequestClose } = this.props;
    const { email } = this.state;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>EMAIL</Text>

        <TextInput
          style={styles.input}
          autoFocus
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={email}
          onChangeText={text => this.setState({ email: text })}
        />

        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>CONVIDAR</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(InviteMember);

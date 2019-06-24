import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

import TeamSwitcher from '../../components/TeamSwitcher';
import Projects from '../../components/Projects';

class Main extends Component {
  static propTypes = {
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
  };

  static defaultProps = {
    activeTeam: null,
  };

  state = {
    leftOpen: false,
  };

  toggleMenu = (position, isOpen) => {
    this.setState({ [`${position}Open`]: isOpen });
  };

  render() {
    const { activeTeam } = this.props;
    const { leftOpen } = this.state;

    return (
      <View style={styles.backgroundWrapper}>
        <SideMenu
          isOpen={leftOpen}
          disableGestures
          onChange={isOpen => this.toggleMenu('left', isOpen)}
          openMenuOffset={70}
          menu={<TeamSwitcher />}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                hitSlop={{
                  top: 15,
                  right: 15,
                  bottom: 15,
                  left: 15,
                }}
                onPress={() => this.toggleMenu('left', true)}
              >
                <Icon name="menu" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.teamTitle}>
                {activeTeam ? activeTeam.name : 'Selecione um time'}
              </Text>
              <TouchableOpacity
                onPress={() => {}}
                hitSlop={{
                  top: 15,
                  right: 15,
                  bottom: 15,
                  left: 15,
                }}
              >
                <Icon name="group" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <Projects />
          </View>
        </SideMenu>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
});

export default connect(mapStateToProps)(Main);

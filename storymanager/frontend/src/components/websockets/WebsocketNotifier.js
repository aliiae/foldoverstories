import { connect } from 'react-redux';
import useInternetStatus from '../../hooks/useInternetStatus';
import useWebsocket from '../../hooks/useWebsocket';
import { authPropType, matchPropType } from '../common/commonPropTypes';

export function WebsocketNotifier(props) {
  const { match, auth } = props;

  const roomTitle = match.params.id;
  const { isOnline } = useInternetStatus();
  const ws = useWebsocket({ isOnline, token: auth.token, roomTitle });
  return null;
}

WebsocketNotifier.propTypes = {
  auth: authPropType.isRequired,
  match: matchPropType.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,

});
export default connect(mapStateToProps)(WebsocketNotifier);

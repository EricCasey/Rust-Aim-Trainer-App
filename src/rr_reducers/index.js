import { combineReducers } from 'redux';

import Theme from './rr_r_theme';
import Layout from './rr_r_layout';
import Weapons from './rr_r_weapons';
import History from './rr_r_history';
import Targets from './rr_r_targets';
import Options from './rr_r_options';

const rootReducer = combineReducers({
  theme: Theme,
  layout: Layout,
  weapons: Weapons,
  history: History,
  targets: Targets,
  options: Options
});

export default rootReducer;
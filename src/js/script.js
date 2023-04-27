import '../scss/style.scss';
import { addWrapper, addInfoBlock } from './script.utils';
import { VirtualKeyboard } from './components/virtualKeyboard/VirtualKeyboard';
import { MonitorComponent } from './components/monitor/MonitiorComponent';
import { KeyboardComponent } from './components/keyboard/KeyboardComponent';
import { createStore } from './core/state/CreateStore';
import { rootReducer } from './redux/rootReducer';
import { initialState } from './redux/initialState';
import { storage } from './core/utils';

const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
  storage('keyBoard-state', state);
});

addWrapper()

const virtualKeyboard = new VirtualKeyboard('#keyboard', {
  components: [MonitorComponent, KeyboardComponent],
  store,
});
virtualKeyboard.render();

addInfoBlock()

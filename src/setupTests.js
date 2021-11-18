// Enzyme aún no está disponible para react 17, por lo que usaremos un adaptador: https://github.com/wojtekmaj/enzyme-adapter-react-17
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

// Para enzyme-to-json:
import {createSerializer} from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import Enzyme, { configure, enzyme, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

Enzyme.configure({ adapter: new Adapter() });
{
    /* test case for footer component */
}
describe('<Footer />', () => {
    test('footer', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper).toMatchSnapshot();
    });

    {
        /* test case for route */
    }
    it('Footer Route', () => {
        const component = renderer
            .create(
                <MemoryRouter>
                    <Footer />
                </MemoryRouter>
            )
            .toJSON();
        expect(component).toMatchSnapshot();
    });
    {
        /* test case for button class */
    }
    it('it should have button class', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find('.btn-link').exists()).toEqual(true);
    });
});

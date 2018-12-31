import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link, MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import MasterNavigationMenu from './MasterNavigationMenu';
import NavigationMenu from '../../json/navigation.json';
import PracticeCardList from '../PracticeCardList/PracticeCardList';
import MasterCard from '../MasterCard/MasterCard';
import MasterTab from '../MasterTab/MasterTab';
import PracticeCardList from '../../json/PracticeCardList.json';

Enzyme.configure({ adapter: new Adapter() });

describe('<MasterNavigationMenu />', () => {
    const wrapper = shallow(
        <MasterNavigationMenu sideNavigation={NavigationMenu.sideNavigation} />
    );
    test('renders', () => {
        // const wrapper = shallow(<MasterNavigationMenu sideNavigation={NavigationMenu.sideNavigation} />);
        expect(wrapper).toMatchSnapshot();
    });

    // it('should have one navivation class',()=>{
    //   expect(wrapper.find('.navigation')).toHaveLength(1);
    // });

    it('should match lenght of li with lenght of items', () => {
        let menuLenght = NavigationMenu.sideNavigation.mainMenu.length;
        expect(wrapper.find('Link')).toHaveLength(menuLenght);
    });

    it('Master Card Route', () => {
        const component = renderer
            .create(
                <MemoryRouter>
                    <MasterCard />
                </MemoryRouter>
            )
            .toJSON();
        expect(component).toMatchSnapshot();
    });

    it('Master Figmdlistview Route', () => {
        const component = renderer
            .create(
                <MemoryRouter>
                    <PracticeCardList figmdListViewProp={PracticeCardList} />
                </MemoryRouter>
            )
            .toJSON();
        expect(component).toMatchSnapshot();
    });

    it('Footer Route', () => {
        const component = renderer
            .create(
                <MemoryRouter>
                    <MasterTab />
                </MemoryRouter>
            )
            .toJSON();
        expect(component).toMatchSnapshot();
    });
});

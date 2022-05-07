import { DetailComponent } from './detail.component';

describe('Detail Component', () => {
  let component: DetailComponent
  beforeEach(() => {
    component = new DetailComponent();
  });

  it('openState should be false by default', () => {
    expect(component.stateChange.value.isOpened).toEqual(false);
  });

  it('openState should toggle to true', () => {
    expect(component.stateChange.value.isOpened).toEqual(false);
    component.toggle();
    expect(component.stateChange.value.isOpened).toEqual(true);
  });

  it('ids should not match between components', () => {
    const component2 = new DetailComponent();
    expect(component.ariaBodyId).not.toEqual(component2.ariaBodyId);
    expect(component.ariaHeaderId).not.toEqual(component2.ariaHeaderId);
  })
})

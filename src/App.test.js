import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create ShallowWrapper for the App component.
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  state && wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} value - Value of data-test attribute to search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test="${value}"]`);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders counter button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders display counter", () => {
  const wrapper = setup();
  const displayCounter = findByTestAttr(wrapper, "display-counter");
  expect(displayCounter.length).toBe(1);
});

test("counter start at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments display counter", () => {
  const counter = 10;
  const wrapper = setup(null, { counter });

  // simulate button click and increment count
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  wrapper.update();

  // find display and test value
  const displayCounter = findByTestAttr(wrapper, "display-counter");
  expect(displayCounter.text()).toContain(counter + 1);
});

test("clicking on decrement button should decrement the counter", () => {
  const counter = 10;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  wrapper.update();

  const displayCounter = findByTestAttr(wrapper, "display-counter");
  expect(displayCounter.text()).toContain(counter - 1);
});

test("show error when counter < 0", () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");
  wrapper.update();

  // check if error appears
  const error = findByTestAttr(wrapper, "error");
  expect(error.length).toBe(1);
});

test("hide error when counter > 0", () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  const buttonDec = findByTestAttr(wrapper, "decrement-button");
  buttonDec.simulate("click");
  wrapper.update();

  const buttonInc = findByTestAttr(wrapper, "increment-button");
  buttonInc.simulate("click");
  wrapper.update();

  // check if error appears
  const error = findByTestAttr(wrapper, "error");
  expect(error.length).toBe(1);
});

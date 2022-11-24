import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../../App";
import store from "../../redux/store";


test("renders header", () => {
  render(
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  );
  let user = JSON.parse(localStorage.getItem("values"))
  if(user){
    const programming = screen.getByText(/Create Post/i);
  expect(programming).toBeInTheDocument();
  const dataScience = screen.getByText(/My Profile/i);
  expect(dataScience).toBeInTheDocument();
  const selfImprovement = screen.getByText(/My Post/i);
  expect(selfImprovement).toBeInTheDocument();
  const others = screen.getByText(/Logout/i);
  expect(others).toBeInTheDocument();
  }else{
    const programming = screen.getByText(/Programming/i);
  expect(programming).toBeInTheDocument();
  const dataScience = screen.getByText(/Data Science/i);
  expect(dataScience).toBeInTheDocument();
  const selfImprovement = screen.getByText(/Self Improvement/i);
  expect(selfImprovement).toBeInTheDocument();
  const technology = screen.getByText(/Technology/i);
  expect(technology).toBeInTheDocument();
  const others = screen.getByText(/Others/i);
  expect(others).toBeInTheDocument();

  const getStarted = screen.getByRole("button", { name: "Get Started" });
  fireEvent.click(getStarted);
  expect(getStarted).toBeVisible();
  }
});

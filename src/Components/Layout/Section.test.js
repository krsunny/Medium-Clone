import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../../App";
import store from "../../redux/store";

test("renders Section", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const startReading = screen.getByText(/Start reading/i);
  expect(startReading).toBeInTheDocument();
  const desc = screen.getByText(
    /Discover stories, thinking, and expertise from writers on any topic./i
  );
  expect(desc).toBeInTheDocument();
  const heading = screen.getByText(/Stay curious./i);
  expect(heading).toBeInTheDocument();
});

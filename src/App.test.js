import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";


test("renders app", () => {
  render(
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  );
  const linkElement = screen.getByText(/Stay curious./i);
  expect(linkElement).toBeInTheDocument();
});

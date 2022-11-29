import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
jest.mock("react-redux");

test("renders header", () => {
  useSelector.mockReturnValue(function () {
    return {
      name: "Sunny",
      email: "krsunny088@gmail.com",
      password: "123456Ms*",
      id: 4,
    };
  });
  useDispatch.mockReturnValue(function () {
    return [
      {
        name: "Sunny",
        id: 1,
        email: "Sunny@gmail.com",
        password: "12345678Ms*",
      },
    ];
  });
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  //   test('Navbar before user is logged in',()=>{

  //   })

  //   test('Navbar after user is logged in',()=>{

  // })

  //   if(user){
  //     const programming = screen.getByText(/Create Post/i);
  //   expect(programming).toBeInTheDocument();
  //   const dataScience = screen.getByText(/My Profile/i);
  //   expect(dataScience).toBeInTheDocument();
  //   const selfImprovement = screen.getByText(/My Post/i);
  //   expect(selfImprovement).toBeInTheDocument();
  //   const others = screen.getByText(/Logout/i);
  //   expect(others).toBeInTheDocument();
  //   }else{
  //     const programming = screen.getByText(/Programming/i);
  //   expect(programming).toBeInTheDocument();
  //   const dataScience = screen.getByText(/Data Science/i);
  //   expect(dataScience).toBeInTheDocument();
  //   const selfImprovement = screen.getByText(/Self Improvement/i);
  //   expect(selfImprovement).toBeInTheDocument();
  //   const technology = screen.getByText(/Technology/i);
  //   expect(technology).toBeInTheDocument();
  //   const others = screen.getByText(/Others/i);
  //   expect(others).toBeInTheDocument();

  //   const getStarted = screen.getByRole("button", { name: "Get Started" });
  //   fireEvent.click(getStarted);
  //   expect(getStarted).toBeVisible();
  //   }
});
const setLocalStorage = (values, data) => {
  window.localStorage.setItem(
    values,
    JSON.stringify({
      name: "Sunny",
      email: "krsunny088@gmail.com",
      password: "123456Ms*",
      id: 4,
    })
  );
};

// test("data is added into local storage", () => {
//   useSelector.mockReturnValue(function () {
//     return {
//       name: "Sunny",
//       email: "krsunny088@gmail.com",
//       password: "123456Ms*",
//       id: 4,
//     };
//   });
//   useDispatch.mockReturnValue(function () {
//     return [
//       {
//         name: "Sunny",
//         id: 1,
//         email: "Sunny@gmail.com",
//         password: "12345678Ms*",
//       },
//     ];
//   });
//   render(
//     <BrowserRouter>
//       <Header />
//     </BrowserRouter>
//   );
//   const mockId = "values";
//   const mockJson = {
//     name: "Sunny",
//     email: "krsunny088@gmail.com",
//     password: "123456Ms*",
//     id: 4,
//   };
//   setLocalStorage(mockId, mockJson);
//   console.log(localStorage.getItem('values'))
//   expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
//   const createpost = screen.getByText(/Create Post/i);
//   expect(createpost).toBeInTheDocument();
//   const myprofile = screen.getByText(/My Profile/i);
//   expect(myprofile).toBeInTheDocument();
//   const mypost = screen.getByText(/My Post/i);
//   expect(mypost).toBeInTheDocument();
//   const logout = screen.getByText(/Logout/i);
//   expect(logout).toBeInTheDocument();
// });

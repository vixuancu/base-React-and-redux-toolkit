import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "./redux/slices/userSlice";
function App() {
  const dispatch = useDispatch();
  const listUsers = useSelector((state) => state.user.listUsers);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isError = useSelector((state) => state.user.isError);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  if (isError === true && isLoading === false) {
    return <div>something wrongs .Please try again</div>;
  }
  if (isError === false && isLoading === true) {
    return <div>Loading data ...</div>;
  }
  return (
    <>
      <div className="App">
        <header className="App-header">
          <table>
            <thead>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
            </thead>
            <tbody>
              {listUsers &&
                listUsers.length > 0 &&
                listUsers.map((item, index) => (
                  <tr key={`table-redux-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.username}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </header>
      </div>
    </>
  );
}

export default App;

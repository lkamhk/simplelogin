import { createContext, useState } from "react";
export const Message_data = createContext(null);

function Context({ children }) {
  const [message, setMessage] = useState();
  const [isBack, setisBack] = useState();
  return (
    <Message_data.Provider value={{ message, setMessage ,isBack, setisBack }}>
      {children}
    </Message_data.Provider>
  );
}

export default Context
import { useState } from "react";

const useData = () => {
  const [component, setComponent] = useState([]);
  const [showBtn, setShowBtn] = useState(false);

  // store renderer component to localStorage for future use
  const addComponent = (id, name) => {
    let exist = localStorage.getItem("component")
      ? JSON.parse(localStorage.getItem("component"))
      : {};
    if (exist[id]) {
      Object.entries(exist).forEach(([key, value]) => {
        if (key === id) {
          let arr = [...component, name];
          setComponent(arr);
          setShowBtn(true);
        } else {
          let arr = [...component, name];
          setComponent(arr);
          setShowBtn(true);
        }
      });
    } else {
      let arr = [...component, name];
      setComponent(arr);
      setShowBtn(true);
    }
  };

  const removeComponent = (id, name) => {
    let exist = localStorage.getItem("component")
      ? JSON.parse(localStorage.getItem("component"))
      : {};
    if (exist[id]) {
      Object.entries(exist).forEach(([key, value]) => {
        if (key === id) {
          let updated = value.filter((item) => item !== name);
          setComponent(updated);
          setShowBtn(true);
        }
      });
    }
  };

  return {
    component,
    addComponent,
    removeComponent,
    showBtn,
    setShowBtn,
    setComponent,
  };
};

export default useData;

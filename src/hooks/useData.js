import { useEffect, useState } from "react";

const useData = () => {
  const [component, setComponent] = useState([]);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const storedComponent = localStorage.getItem("component")
      ? JSON.parse(localStorage.getItem("component"))
      : [];
    if (storedComponent.length > component.length) {
      setComponent(storedComponent);
    }
  }, [component]);

  const addComponent = (name) => {
    localStorage.setItem("old_component", JSON.stringify(component));
    const newArray = [...component, name];
    setComponent(newArray);
    setShowBtn(true);
  };

  const removeComponent = (name) => {
    const newArray = component.filter((item) => item !== name);
    setComponent(newArray);
  };

  return {
    component,
    addComponent,
    removeComponent,
    showBtn,
    setShowBtn,
  };
};

export default useData;

scroll.on("call", (func, direction, obj) => {
  if (func === "grow" && direction === "enter") {
    obj.el.classList.add("grow");
  } else if (func === "grow" && direction === "leave") {
    obj.el.classList.remove("grow");
  }
});
const findDays = () => {
  const days = JSON.parse(localStorage.days ?? "[]");
  if (!days.length) {
    localStorage.setItem("days", "[]");
    return [];
  }
  return days;
};
const insertDay = (day) => {
  const days = JSON.parse(localStorage.days);
  days.push({ ...day, id: days.length });
  localStorage.setItem("days", JSON.stringify(days));
};
const removeDay = (id) => {
  const days = JSON.parse(localStorage.days);
  const newDays = days.filter((e) => e.id !== id);
  localStorage.setItem("days", JSON.stringify(newDays));
};
const replaceDay = (id, newDay) => {
  const days = JSON.parse(localStorage.days);
  const index = days.findIndex((e) => e.id === id);
  days[index] = { ...newDay, id: index };
  localStorage.setItem("days", JSON.stringify(days));
};
const setTheme = (val) => {
  localStorage.setItem("theme", JSON.stringify(val));
};
const getTheme = () => {
  const theme = localStorage.theme;
  if (!theme) {
    localStorage.setItem("theme", "false");
    return true;
  }
  return !!JSON.parse(theme);
};
export default {
  findDays,
  insertDay,
  removeDay,
  replaceDay,
  setTheme,
  getTheme,
};

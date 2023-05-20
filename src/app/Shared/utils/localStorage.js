export function insertIntoLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key) {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  } else {
    return null;
  }
}

export function deleteFromLocalStorage(key) {
  localStorage.removeItem(key);
}

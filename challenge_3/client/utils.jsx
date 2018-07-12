String.prototype.hashCode = function() {
  let hash = 0;
  let char;
  let i;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
};

const postData = (url, data, callback) => {
  window
    .fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    })
    .then(response => console.log(response))
    .then(callback);
};

const createInput = (id, placeholder, handleChange, type) => (
  <input
    id={id}
    placeholder={placeholder}
    onChange={handleChange}
    type={type ? type : "text"}
  />
);

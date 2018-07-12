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

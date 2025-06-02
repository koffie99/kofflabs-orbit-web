const formatName = (name) => {
  try {
    const formattedName = name
      .toLowerCase()
      .trim()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
    return formattedName.join(" ");
  } catch (err) {
    console.log(err);
  }
};

export default formatName;

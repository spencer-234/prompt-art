export const deleteId = async (url) => {
  let res = await fetch(url, {
    method: "DELETE"
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        console.log(data.message);
        return true;
      }
      else {
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
    })

  return res;
};
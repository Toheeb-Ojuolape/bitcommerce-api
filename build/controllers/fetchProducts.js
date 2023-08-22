const data = require("../../data.json");

module.exports.fetchProducts = (req, res) => {
  try {
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(400).json({
        error:"Error encountered while fetching product data"
    })
  }
};

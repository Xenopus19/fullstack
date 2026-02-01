const DataLoader = require("dataloader");
const Book = require("./models/book");
const mongoose = require("mongoose");

const createLoaders = () => {
  return {
    bookCountLoader: new DataLoader(async (authorIds) => {
      const objectIds = authorIds.map((id) => new mongoose.Types.ObjectId(id));

      const counts = await Book.aggregate([
        {
          $match: {
            author: { $in: objectIds },
          },
        },
        { $group: { _id: "$author", count: { $sum: 1 } } },
      ]);

      const countMap = {};
      counts.forEach((c) => {
        if (c._id) {
          countMap[c._id.toString()] = c.count;
        }
      });

      return authorIds.map((id) => countMap[id.toString()] || 0);
    }),
  };
};

module.exports = createLoaders;

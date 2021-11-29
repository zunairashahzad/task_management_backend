const mongoose = require("mongoose");

const isValidObjectId = (objectId) => {
  try {
    const { ObjectId } = mongoose.Types;

    // This will return true for any 12 or 24 chars string
    let isValid = ObjectId.isValid(objectId);

    /**
     * Valid ids do not change when casted to an ObjectId but a string that gets a false valid
     * will change when casted to an objectId
     */
    if (isValid) {
      const castedObjectId = new ObjectId(objectId);

      isValid = String(objectId) === String(castedObjectId);
    }

    return isValid;
  } catch (error) {
    console.error("Invalid ObjectID", error);

    return false;
  }
};

module.exports = { isValidObjectId };

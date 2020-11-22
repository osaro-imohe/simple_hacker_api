import jsonpatch from "jsonpatch";

export const patchJson = async (req, res) => {
  const { jsonObject, jsonPatch } = req.body;

  if (!jsonObject || Object.keys(jsonObject).length === 0) {
    res.json({
      success: false,
      message: "Please provide a JSON Object",
    });
  }

  if (!jsonPatch || jsonPatch.length === 0) {
    res.json({
      success: false,
      message: "Please provide a JSON Patch",
    });
  }

  const patchedDoc = await jsonpatch.apply_patch(jsonObject, jsonPatch);
  res.json({
    success: true,
    message: "JSON object patched successfully",
    patchedDoc,
  });
};

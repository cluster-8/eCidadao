function formatReqType(type: String) {
  if (!type) return "";

  let label = "";
  switch (type) {
    case "arvoreCaindo":
      label = "Árvore caindo";
      break;
    default:
      break;
  }

  return label;
}

export default formatReqType;

function formatReqStatus(status: String | undefined) {
  if (!status) return;
  return status === "opened" ? "Aberta" : "Fechada";
}

export default formatReqStatus;

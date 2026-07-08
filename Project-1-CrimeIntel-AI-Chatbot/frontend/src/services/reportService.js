import api from "./api";

export const createPDFReport = async (
  reportTitle,
  caseMasterId = null,
  reportType = "case_report"
) => {
  const response = await api.post("/api/reports/pdf", {
    case_master_id: caseMasterId,
    report_title: reportTitle,
    report_type: reportType,
  });

  return response.data;
};

export const getReports = async () => {
  const response = await api.get("/api/reports/");
  return response.data;
};
export const fetchSampleData = () => fetch("/api/sample").then(r => r.text());

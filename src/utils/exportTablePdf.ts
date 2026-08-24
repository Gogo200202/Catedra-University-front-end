let fontPromise: Promise<string> | null = null;

function loadRobotoBase64(): Promise<string> {
  if (!fontPromise) {
    fontPromise = fetch("/fonts/Roboto-Regular.ttf")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.length; i += chunkSize) {
          binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
        }
        return btoa(binary);
      });
  }
  return fontPromise;
}

export interface TablePdfOptions {
  fileName: string;
  docTitle: string;
  orientation?: "portrait" | "landscape";
  columns: string[];
  rows: string[][];
}

export async function exportTablePdf(options: TablePdfOptions): Promise<void> {
  const [{ jsPDF }, autoTableModule] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);
  const autoTable = autoTableModule.default;

  const font = await loadRobotoBase64();
  const doc = new jsPDF({
    orientation: options.orientation ?? "portrait",
    unit: "pt",
  });

  doc.addFileToVFS("Roboto-Regular.ttf", font);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");

  doc.setFontSize(14);
  doc.text(options.docTitle, 40, 48);

  autoTable(doc, {
    startY: 72,
    head: [options.columns],
    body: options.rows,
    styles: { font: "Roboto", fontSize: 10, cellPadding: 6 },
    headStyles: { font: "Roboto", fontStyle: "normal", fillColor: [13, 59, 102], textColor: 255 },
  });

  doc.save(`${options.fileName}.pdf`);
}

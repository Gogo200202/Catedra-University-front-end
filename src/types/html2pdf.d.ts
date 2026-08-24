declare module "html2pdf.js" {
  interface Html2PdfWorkflow {
    set(options: Record<string, unknown>): Html2PdfWorkflow;
    from(element: HTMLElement): Html2PdfWorkflow;
    save(): Promise<unknown>;
  }

  export default function html2pdf(): Html2PdfWorkflow;
}

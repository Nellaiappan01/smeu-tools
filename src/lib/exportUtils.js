import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

export async function createZipAndPdf(generated) {
  const zip = new JSZip();
  const groups = {};

  for (const g of generated) {
    (groups[g.sku] = groups[g.sku] || []).push(g);
  }

  for (const sku of Object.keys(groups)) {
    const folder = zip.folder(sku);
    for (const item of groups[sku]) {
      const buffer = await item.blob.arrayBuffer();
      folder.file(item.filename, buffer);
    }
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, 'labels_by_sku.zip');

  // PDF
  const doc = new jsPDF({ unit: 'in', format: [4, 6] });
  let first = true;
  for (const g of generated) {
    const dataUrl = await blobToDataURL(g.blob);
    if (!first) doc.addPage([4,6], 'portrait');
    doc.addImage(dataUrl, 'PNG', 0, 0, 4, 6);
    first = false;
  }
  const pdfBlob = doc.output('blob');
  saveAs(pdfBlob, 'labels_4x6.pdf');
}

function blobToDataURL(blob) {
  return new Promise((res) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.readAsDataURL(blob);
  });
}

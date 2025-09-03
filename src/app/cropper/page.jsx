import { logUsage } from "@/lib/logUsage";
import InvoiceCropper from "@/components/InvoiceCropper";
import MeeshoCropper from "@/components/MeeshoCropper";
import AmazonCropper from "@/components/AmazonCropper";

export default function InvoicePage() {
  return <InvoiceCropper onSuccess={() => logUsage("Invoice Cropper")} />;
}

export default function MeeshoPage() {
  return <MeeshoCropper onSuccess={() => logUsage("Meesho Cropper")} />;
}

export default function AmazonPage() {
  return <AmazonCropper onSuccess={() => logUsage("Amazon Cropper")} />;
}

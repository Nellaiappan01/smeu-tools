declare module "@/components/AutoCropper" {
  import React from "react";
  export interface AutoCropperProps { onSuccess?: () => void }
  const AutoCropper: React.FC<AutoCropperProps>;
  export default AutoCropper;
}

declare module "@/components/InvoiceCropper" {
  import React from "react";
  export interface InvoiceCropperProps { onSuccess?: () => void }
  const InvoiceCropper: React.FC<InvoiceCropperProps>;
  export default InvoiceCropper;
}

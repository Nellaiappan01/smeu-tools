"use client";
import ProcessWrapper from "@/components/ProcessWrapper";

export default function AmazonPage() {
  const fakeProcess = async () => {
    await new Promise((res) => setTimeout(res, 2000));
  };

  return (
    <div className="flex items-center justify-center h-[70vh] text-center">
      <ProcessWrapper onProcess={fakeProcess}>
        {({ handleAction, status }) => (
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-600">
              🚧 Amazon Cropper – Coming Soon!
            </h1>
            <button
              onClick={handleAction}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              Test Loader
            </button>
            {status === "success" && (
              <p className="text-green-600 font-semibold">✅ Works fine!</p>
            )}
          </div>
        )}
      </ProcessWrapper>
    </div>
  );
}

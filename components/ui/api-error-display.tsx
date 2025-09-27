// The props this component expects: a main message and an optional list of detailed errors.
type ApiErrorDisplayProps = {
  message: string;
  errors?: string[] | null;
};

export default function ApiErrorDisplay({
  message,
  errors,
}: ApiErrorDisplayProps) {
  return (
    // This uses TailwindCSS classes to style a red alert box.
    <div
      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md"
      role="alert"
    >
      <p className="font-bold">An Error Occurred</p>
      <p>{message}</p>
      
      {/* This part only shows if the 'errors' array exists and has items in it. */}
      {errors && errors.length > 0 && (
        <ul className="mt-2 list-disc list-inside text-sm">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
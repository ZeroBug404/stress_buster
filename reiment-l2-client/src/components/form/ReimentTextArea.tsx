import { Controller } from "react-hook-form";
import { Textarea } from "../ui/textarea";

type TInput = {
  name: string;
  label: string;
};

const ReimentTextArea = ({ label, name }: TInput) => {
  return (
    <div className="CamperTextAreaContainer mb-5 flex flex-col gap-y-1 ">
      {label ? label : null}

      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              id={name}
              {...field}
              className="border border-gray-400 outline-none ring-0 focus-visible:ring-0 "
            />

            {error && (
              <p className="text-xs font-medium text-red-600">
                {error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default ReimentTextArea;

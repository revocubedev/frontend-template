import { cn } from "@/lib";
import { ErrorMessage } from "formik";
import { type ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
   icon?: ReactNode;
   label?: string;
   containerClassName?: string;
   labelClassName?: string;
   innerContainerClassName?: string;
   showPasswordToggle?: boolean;
}

const CustomInput = ({
   icon,
   label,
   containerClassName,
   labelClassName,
   innerContainerClassName,
   showPasswordToggle,
   ...props
}: Props) => {
   const [passwordVisible, setPasswordVisible] = useState(false);
   const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

   return (
      <div className={containerClassName}>
         {!!label && (
            <label
               htmlFor={props["id"]}
               className={cn(
                  "mb-1 block text-sm font-normal text-gray-600",
                  labelClassName,
               )}
            >
               {label}
            </label>
         )}
         <div
            className={cn(
               "flex items-center gap-2 rounded-md border border-input text-sm has-[:focus]:border-primary has-[:disabled]:bg-[#FBFBFB]",
               props.type === "password" ? "relative" : "",
               innerContainerClassName,
            )}
         >
            {icon && <span className="pl-3">{icon}</span>}
            {props.type === "password" ? (
               <>
                  <input
                     className={cn(
                        "text-[#596780] w-full rounded-md !border-0 py-3 text-sm !outline-0 placeholder:text-[#a8b0bd] focus:![--tw-ring-shadow:transparent] disabled:cursor-not-allowed disabled:bg-[#FBFBFB]",
                        icon ? "px-2" : "px-5",
                        props.className,
                     )}
                     {...props}
                     type={passwordVisible ? "text" : "password"}
                  />
                  {showPasswordToggle && (
                     <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        className="position-center-y absolute right-1 max-h-[80%] rounded-full text-[#737D8F]"
                        onClick={togglePasswordVisibility}
                     >
                        {passwordVisible ? (
                           <Eye className="size-5" />
                        ) : (
                           <EyeOff className="size-5" />
                        )}
                     </Button>
                  )}
               </>
            ) : (
               <input
                  {...props}
                  className={cn(
                     "text-[#596780] w-full rounded-md !border-0 p-0 py-3 text-sm !outline-0 placeholder:text-[#a8b0bd] focus:![--tw-ring-shadow:transparent] disabled:cursor-not-allowed disabled:bg-[#FBFBFB]",
                     icon ? "px-2" : "px-5",
                     props["className"],
                  )}
               />
            )}
         </div>
         {!!props["name"] && (
            <ErrorMessage
               name={props["name"]}
               component="div"
               className="block mt-1 text-xs text-destructive"
            />
         )}
      </div>
   );
};

export default CustomInput;
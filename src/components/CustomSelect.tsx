import { ErrorMessage } from "formik";
import { cn } from "@/lib/utils";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./ui/select";

export interface SelectOption {
   label: string;
   value: string | number;
}

export interface CustomSelectProps {
   options: SelectOption[];
   id?: string;
   value?: string | number;
   onChange?: (value: string) => void;
   placeholder?: string;
   className?: string;
   contentClassName?: string;
   containerClassName?: string;
   error?: boolean;
   disabled?: boolean;
   required?: boolean;
   name?: string;
   label?: string;
   labelClassName?: string;
   onOpenChange?: (open: boolean) => void;
}

const CustomSelect = ({
   options,
   value,
   onChange,
   placeholder = "Select an option",
   className,
   contentClassName,
   error,
   disabled,
   required,
   name,
   onOpenChange,
   containerClassName,
   label,
   labelClassName,
   id,
   ...props
}: CustomSelectProps) => {
   return (
      <div className={containerClassName}>
         {!!label && (
            <label
               htmlFor={id}
               className={cn(
                  "mb-1 block text-sm font-normal text-gray-600",
                  labelClassName,
               )}
            >
               {label}
            </label>
         )}
         <Select
            value={options
               .find((option) => String(option.value) === String(value))
               ?.value.toString()}
            onValueChange={onChange}
            disabled={disabled}
            name={name}
            required={required}
            onOpenChange={onOpenChange}
            {...props}
         >
            <SelectTrigger
               className={cn(
                  "px-4 gap-3 py-2.5 text-[15px] capitalize text-gray-500 focus:border-primary",
                  error && "border-destructive !bg-[#FBFBFB] focus:ring-destructive",
                  disabled ? "cursor-not-allowed opacity-50" : "",
                  className,
               )}
            >
               <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent
               className={cn(
                  "min-w-[var(--radix-select-trigger-width)]",
                  contentClassName,
               )}
            >
               {options.map((option) => (
                  <SelectItem
                     key={option.value}
                     value={String(option.value)}
                     className={cn(
                        "cursor-pointer capitalize",
                        disabled ? "cursor-not-allowed" : "",
                     )}
                  >
                     {option.label}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>

         {!!name && (
            <ErrorMessage
               name={name}
               component="div"
               className="block mt-1 text-xs text-destructive"
            />
         )}
      </div>
   );
};

export default CustomSelect;
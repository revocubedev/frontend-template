import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Suspense } from "react";
import Loader from "./Loader";

interface SharedProps extends VariantProps<typeof modalVariants> {
   title: React.ReactNode;
   children: React.ReactNode;
   footer?: React.ReactNode;
   description?: React.ReactNode;
   className?: string;
}
interface CustomModalPropsUnControlled extends SharedProps {
   trigger: React.ReactNode;
   open?: never;
   onOpenChange?: never;
}
interface CustomModalPropsControlled extends SharedProps {
   trigger?: never;
   open: boolean;
   onOpenChange: (state: boolean) => void;
}

type Props = CustomModalPropsUnControlled | CustomModalPropsControlled;

const modalVariants = cva(
   "z-50 flex max-h-[80vh] flex-col overflow-y-auto p-0",
   {
      variants: {
         size: {
            default: "max-w-3xl",
            lg: "max-w-5xl",
            xl: "max-w-7xl",
            sm: "max-w-xl",
         },
      },
   }
)

const DialogHeader = ({
   className,
   ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
   <div
      className={cn(
         "flex flex-col space-y-1.5 text-center sm:text-left",
         className,
      )}
      {...props}
   />
);

export const CustomModal = ({
   title,
   description,
   children,
   footer,
   className,
   size = "default",
   ...rest
}: Props) => {
   if (rest["open"]) {
      const { open, onOpenChange } = rest;

      return (
         <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
               className={modalVariants({ size, className })}
            >
               <DialogHeader className="sticky top-0 z-10 h-fit bg-background">
                  <div className="flex flex-row items-start justify-between px-4 py-4 border-b border-b-input md:px-6 lg:px-8">
                     <div className="w-full">
                        <DialogTitle className="max-w-[80%] truncate text-nowrap text-left text-lg font-semibold text-gray-700">
                           {title}
                        </DialogTitle>
                        <DialogDescription className="text-left">
                           {description}
                        </DialogDescription>
                     </div>

                     <DialogClose
                        type="button"
                        id="modal-close-button"
                        className="!m-0 aspect-square w-fit rounded-full p-1.5 hover:bg-accent"
                     >
                        <X className="size-4" />
                     </DialogClose>
                  </div>
               </DialogHeader>
               <div className="flex-1 px-4 pb-6 md:px-6 lg:px-8">
                  <Suspense fallback={<Loader />}>
                     {children}
                  </Suspense>
               </div>
               {footer && (
                  <DialogFooter className="sm:justify-start">{footer}</DialogFooter>
               )}
            </DialogContent>
         </Dialog>
      );
   }

   const { trigger } = rest;
   return (
      <Dialog>
         <DialogTrigger asChild>
            {trigger}
         </DialogTrigger>
         <DialogContent
            className={modalVariants({ size, className })}
         >
            <DialogHeader className="sticky top-0 z-10 h-fit bg-background">
               <div className="flex flex-row items-start justify-between px-4 py-4 border-b border-b-input md:px-6 lg:px-8">
                  <div className="w-full">
                     <DialogTitle className="max-w-[80%] truncate text-nowrap text-left text-lg font-semibold text-gray-700">
                        {title}
                     </DialogTitle>
                     <DialogDescription className="text-left">
                        {description}
                     </DialogDescription>
                  </div>

                  <DialogClose
                     type="button"
                     id="modal-close-button"
                     className="!m-0 aspect-square w-fit rounded-full p-1.5 hover:bg-accent"
                  >
                     <X className="size-4" />
                  </DialogClose>
               </div>
            </DialogHeader>
            <div className="flex-1 px-4 pb-10 md:px-6 lg:px-8">
               <Suspense fallback={<Loader />}>
                  {children}
               </Suspense>
            </div>
            {footer && (
               <DialogFooter className="sm:justify-start">{footer}</DialogFooter>
            )}
         </DialogContent>
      </Dialog>
   );
};
export default CustomModal;
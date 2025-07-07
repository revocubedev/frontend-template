import { X } from "lucide-react";
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import Loader from "./Loader";

interface SheetProps {
   title: string;
   description?: string;
   children: React.ReactNode
   footer?: React.ReactNode
   className?: string;
}

interface CustomSheetProps extends SheetProps {
   trigger: React.ReactNode;
}

interface CustomSheetWithoutTriggerProps extends SheetProps {
   open: boolean,
   onOpenChange: (open: boolean) => void
}

const CustomSheet = ({
   title,
   description,
   children,
   footer,
   trigger,
   className,
}: CustomSheetProps) => (
   <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
         side="right"
         className={cn(
            "flex flex-col overflow-y-auto p-0 transition-all md:max-w-lg lg:max-w-[39.75rem] [&_.defaultClose]:hidden",
            className,
         )}
      >
         <SheetHeader className="sticky top-0 z-10 h-fit bg-background">
            <div className="flex flex-row items-start justify-between px-4 py-4 border-b border-b-input md:px-6 lg:px-8">
               <div className="flex-1">
                  <SheetTitle className="max-w-[80%] text-left text-lg font-semibold text-gray-700">
                     {title}
                  </SheetTitle>
                  <SheetDescription className="text-left">
                     {description}
                  </SheetDescription>
               </div>

               <SheetClose
                  type="button"
                  id="sheet-button"
                  className="!m-0 aspect-square w-fit rounded-full p-1 hover:bg-accent"
               >
                  <X className="size-5" />
               </SheetClose>
            </div>
         </SheetHeader>

         <div className="flex-1 px-4 pb-10 @container/sheet md:px-6 lg:px-8">
            <Suspense fallback={<Loader />}>
               {children}
            </Suspense>
         </div>

         {footer && (
            <SheetFooter className="sticky bottom-0 px-4 py-4 pt-4 pb-8 bg-background md:px-6 lg:px-8">
               {footer}
            </SheetFooter>
         )}
      </SheetContent>
   </Sheet>
);

export const CustomSheetWithoutTrigger = ({
   title,
   description,
   children,
   footer,
   className,
   ...rest
}: CustomSheetWithoutTriggerProps) => (
   <Sheet {...rest}>
      <SheetContent
         side="right"
         className={cn(
            "flex flex-col overflow-y-auto p-0 transition-all md:max-w-lg lg:max-w-[39.75rem] [&_.defaultClose]:hidden",
            className,
         )}
      >
         <SheetHeader className="sticky top-0 z-10 h-fit bg-background">
            <div className="flex flex-row items-start justify-between px-4 py-4 border-b border-b-input md:px-6 lg:px-8">
               <div className="flex-1">
                  <SheetTitle className="max-w-[80%] text-left text-lg font-semibold text-gray-700">
                     {title}
                  </SheetTitle>
                  <SheetDescription className="text-left">
                     {description}
                  </SheetDescription>
               </div>

               <SheetClose
                  type="button"
                  id="sheet-button"
                  className="!m-0 aspect-square w-fit rounded-full p-1 hover:bg-accent"
               >
                  <X className="size-5" />
               </SheetClose>
            </div>
         </SheetHeader>

         <div className="flex-1 px-4 pb-10 @container/sheet md:px-6 lg:px-8">
            <Suspense fallback={<Loader />}>
               {children}
            </Suspense>
         </div>

         {footer && (
            <SheetFooter className="sticky bottom-0 px-4 py-4 pt-4 pb-8 bg-background md:px-6 lg:px-8">
               {footer}
            </SheetFooter>
         )}
      </SheetContent>
   </Sheet>
);

export default CustomSheet;
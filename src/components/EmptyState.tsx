import { EmptyStateIcon } from "@/assets";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type Props = {
   icon?: ReactNode;
   children: ReactNode;
   className?: string;
};

const defaultIcon = <EmptyStateIcon />;

const EmptyState = ({
   icon = defaultIcon,
   children,
   className,
}: Props) => {
   return (
      <div
         className={cn("flex min-h-[50vh] items-center justify-center", className)}
      >
         <div className="mx-auto grid max-w-[450px] justify-center *:mx-auto *:mb-5">
            {icon}
            {children}
         </div>
      </div>
   );
};

export default EmptyState;
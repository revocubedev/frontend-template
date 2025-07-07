import React, { type ReactNode } from "react";
import DataTable, {
   type PaginationComponentProps,
   type TableProps,
} from "react-data-table-component";
import ReactPaginate, { type ReactPaginateProps } from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { EmptyStateIcon } from "@/assets";
import { cn } from "@/lib/utils";
import Loader from "./Loader";
import CustomSelect from "./CustomSelect";
import merge from "lodash.merge";
import { ChevronLeft } from "lucide-react";
import EmptyState from "./EmptyState";

interface CustomDataTableProps<T> extends TableProps<T> {
   children?: ReactNode;
   containerClassName?: string;
   emptyStateMessage?: React.ReactNode;
   alterParams?: boolean;
   hidePaginationOnSinglePage?: boolean;
   emptyStateClassName?: string
}

const CustomDataTable = <T,>({
   children,
   containerClassName,
   emptyStateMessage,
   customStyles,
   hidePaginationOnSinglePage = false,
   emptyStateClassName,
   ...props
}: CustomDataTableProps<T>) => {
   const [searchParams] = useSearchParams();

   const perPage = parseInt(searchParams.get("per_page") || "15");

   const defaultStyles = {
      table: {
         style: {
            ...(!!props?.data?.length && { border: "1px solid #EAEBF0" }),
            borderRadius: 10,
            marginBottom: "4rem",
            backgroundColor: "transparent",
            overflow: "auto",
            "&>div": { backgroundColor: "transparent" },
         },
      },
      rows: {
         style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#3B4555",
            backgroundColor: "#FFFFFFF6",
            borderBottom: "1px solid #EAEBF0",
            paddingBlock: "1.15rem",
         },
      },
      headRow: {
         style: {
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#596780",
            backgroundColor: "#FFFFFFF6",
         },
      },
   }

   const mergedStyles = merge({}, defaultStyles, customStyles);

   return (
      <div
         className={cn(
            "table-responsive flex w-full flex-col overflow-x-scroll",
            containerClassName,
         )}
      >
         <DataTable
            progressComponent={<Loader />}
            pagination
            paginationServer
            paginationPerPage={perPage}
            paginationComponent={props => <Pagination hidePaginationOnSinglePage={hidePaginationOnSinglePage} {...props} />}
            noDataComponent={
               <EmptyState className={emptyStateClassName} icon={<EmptyStateIcon />}>
                  <div className="max-w-[240px] text-center font-semibold text-[#2C323C]">
                     {emptyStateMessage}
                  </div>
               </EmptyState>
            }
            customStyles={mergedStyles}
            {...props}
         />
         {children}
      </div>
   );
};

type HandlePageClick = Parameters<NonNullable<ReactPaginateProps["onPageChange"]>>[0]
const options = [
   { value: "1", label: "1" },
   { value: "10", label: "10" },
   { value: "15", label: "15" },
   { value: "20", label: "20" },
   { value: "25", label: "25" },
   { value: "50", label: "50" },
];

export const Pagination = ({
   rowCount,
   onChangePage,
   onChangeRowsPerPage,
   className,
   hidePaginationOnSinglePage
}: PaginationComponentProps & { className?: string, hidePaginationOnSinglePage?: boolean }) => {
   const [searchParams, setSearchParams] = useSearchParams();

   const updateSearchParams = (key: string, value: string | number) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set(key, String(value));

      setSearchParams(newSearchParams);
   };
   const updatePerPageParams = (key: string, value: string | number) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set(key, String(value));
      newSearchParams.set("page", "1");

      setSearchParams(newSearchParams);
   };

   const rowsPerPage = parseInt(searchParams.get("per_page") || "0") || 15;

   const pageCount = Math.ceil(rowCount / rowsPerPage);

   const handlePageClick = ({ selected }: HandlePageClick) => {
      updateSearchParams("page", selected + 1);
      onChangePage(selected + 1, rowCount);
   };
   const handlePerPageClick = (perPage: number) => {
      updatePerPageParams("per_page", perPage);
      onChangeRowsPerPage(perPage, rowCount);
   };

   if (hidePaginationOnSinglePage && pageCount <= 1) return null;

   return (
      <div className={cn("flex flex-wrap-reverse gap-5", className)}>
         <div className="flex items-center gap-1 font-display text-sm text-[#576378]">
            <p>Show</p>
            <CustomSelect
               options={options}
               className="gap-2 px-[0.625rem]"
               value={searchParams.get("per_page") || "15"}
               onChange={(val) => handlePerPageClick(Number(val))}
               placeholder="Number"
            />
            <p>entries per page</p>
         </div>
         <ReactPaginate
            breakLabel="..."
            previousLabel={
               <ChevronLeft className="size-3 text-[#576378]" />
            }
            nextLabel={<ChevronLeft className="size-3 rotate-180 text-[#576378]" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            forcePage={
               searchParams.has("page")
                  ? parseInt(searchParams.get("page") || "1") - 1
                  : 0
            }
            containerClassName="custom-pagination"
            pageClassName="custom-pagination-page"
            previousClassName="custom-pagination-previous"
            nextClassName="custom-pagination-next"
         />
      </div>
   );
};

export default CustomDataTable;
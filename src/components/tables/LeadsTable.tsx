import { ColumnDef } from "@tanstack/react-table";
import AdvanceTable from "components/base/AdvanceTable";
import AdvanceTableFooter from "components/base/AdvanceTableFooter";
import Avatar from "components/base/Avatar";
import Badge from "components/base/Badge";
import RevealDropdown, {
  RevealDropdownTrigger,
} from "components/base/RevealDropdown";
import ActionDropdownItems from "components/common/ActionDropdownItems";
import { LeadDataType } from "data/crm/leadsTableData";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

export const leadsTableColumns: ColumnDef<LeadDataType>[] = [
  {
    accessorKey: "customer.name",
    header: "Name",
    cell: ({ row: { original } }) => {
      const {
        avatar,
        name,
        designation,
        status: { label, type },
      } = original.customer;
      return (
        <div className="d-flex align-items-center">
          <Link to="/apps/crm/lead-details#tasks">
            <Avatar src={avatar} size="xl" className="me-3" />
          </Link>
          <div>
            <Link to="/apps/crm/lead-details#tasks" className="fs-8 fw-bold">
              {name}
            </Link>
            <div className="d-flex align-items-center">
              <p className="mb-0 text-1000 fw-semi-bold fs-9 me-2">
                {designation}
              </p>
              <Badge variant="phoenix" bg={type}>
                {label}
              </Badge>
            </div>
          </div>
        </div>
      );
    },
    meta: {
      headerProps: { style: { width: "25%" }, className: "ps-0" },
      cellProps: { className: "white-space-nowrap ps-0" },
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return (
        <div className="d-inline-flex flex-center">
          <div className="px-1 py-1 bg-success-100 rounded me-2">
            <FeatherIcon
              icon="mail"
              size={16}
              className="text-success-600 dark__text-success-300"
            />
          </div>
          <span>Email</span>
        </div>
      );
    },
    cell: ({ row: { original } }) => {
      const { email } = original;
      return (
        <Link className="text-1000" to={`mailto:${email}`}>
          {email}
        </Link>
      );
    },
    meta: {
      headerProps: {
        style: { width: "15%" },
        className: "ps-4 pe-5 border-end",
      },
      cellProps: {
        className: "white-space-nowrap fw-semi-bold ps-4 border-end",
      },
    },
  },
  {
    accessorKey: "phone",
    header: () => {
      return (
        <div className="d-inline-flex flex-center">
          <div className="px-1 py-1 bg-primary-100 rounded me-2">
            <FeatherIcon
              icon="phone"
              size={16}
              className="text-primary-600 dark__text-primary-300"
            />
          </div>
          <span>Phone</span>
        </div>
      );
    },
    cell: ({ row: { original } }) => {
      const { phone } = original;
      return (
        <Link className="text-1000" to={`tel:${phone}`}>
          {phone}
        </Link>
      );
    },
    meta: {
      headerProps: {
        style: { width: "15%", minWidth: "180px" },
        className: "ps-4 pe-5 border-end",
      },
      cellProps: {
        className: "white-space-nowrap fw-semi-bold ps-4 border-end",
      },
    },
  },
  {
    accessorKey: "contact",
    header: () => {
      return (
        <div className="d-inline-flex flex-center">
          <div className="px-1 py-1 bg-info-100 rounded me-2">
            <FeatherIcon
              icon="user"
              size={16}
              className="text-info-600 dark__text-info-300"
            />
          </div>
          <span>Contact name</span>
        </div>
      );
    },
    cell: ({ row: { original } }) => original.contact,
    meta: {
      headerProps: {
        style: { width: "15%" },
        className: "ps-4 pe-5 border-end",
      },
      cellProps: {
        className: "white-space-nowrap ps-4 border-end fw-semi-bold text-1000",
      },
    },
  },
  {
    accessorKey: "company",
    header: () => {
      return (
        <div className="d-inline-flex flex-center">
          <div className="px-1 py-1 bg-warning-100 rounded me-2">
            <FeatherIcon
              icon="grid"
              size={16}
              className="text-warning-600 dark__text-warning-300"
            />
          </div>
          <span>Company name</span>
        </div>
      );
    },
    cell: ({ row: { original } }) => original.company,
    meta: {
      headerProps: {
        style: { width: "15%" },
        className: "ps-4 pe-5 border-end",
      },
      cellProps: {
        className: "white-space-nowrap ps-4 border-end fw-semi-bold text-1000",
      },
    },
  },
  {
    accessorKey: "date",
    header: "Create date",
    cell: ({ row: { original } }) => original.date,
    meta: {
      headerProps: {
        style: { width: "15%" },
        className: "ps-4 pe-5",
      },
      cellProps: {
        className: "white-space-nowrap ps-4 text-700",
      },
    },
  },
  {
    id: "leadDropdown",
    cell: () => {
      return (
        <RevealDropdownTrigger>
          <RevealDropdown>
            <ActionDropdownItems />
          </RevealDropdown>
        </RevealDropdownTrigger>
      );
    },
    meta: {
      cellProps: {
        className: "text-end pe-0 ps-4",
      },
    },
  },
  {
    id: "designation",
    accessorFn: ({ customer }) => customer.designation,
  },
  {
    id: "status",
    accessorFn: ({ customer }) => customer.status.label,
  },
];

const LeadsTable = () => {
  return (
    <div className="border-top">
      <AdvanceTable
        tableProps={{ className: "phoenix-table fs-9" }}
        rowClassName="hover-actions-trigger btn-reveal-trigger"
      />
      <AdvanceTableFooter pagination className="py-4" />
    </div>
  );
};

export default LeadsTable;
